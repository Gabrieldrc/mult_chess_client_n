import style from "./ChessComponent.module.sass";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import PieceInterface from "@interfaces/Piece.interface";
import IPosition from "@interfaces/Position.interface";
import { emitPlay } from "@services/chess/socketClient";
import ChessGrid from "@components/ChessGrid/ChessGrid";

type ChessProps = {
  board: PieceInterface[][];
  playerNumber: number;
  turn: number;
};

function ChessComponent({ board, playerNumber, turn }: ChessProps) {
  const positionSelected = useRef<IPosition>(null);
  const [isHighLight, setIsHighLight] = useState<boolean[][]>([]);

  useEffect(() => {
    const matrix = [];
    board.map((col) => {
      const row = [];
      col.map(() => {
        row.push(false);
      });
      matrix.push(row);
    });
    setIsHighLight(matrix);
  }, [board]);

  const getNormalState = useCallback(() => {
    const copy = isHighLight.concat([]);
    board.map((col, i) => {
      col.map((elemtent, j) => {
        if (isHighLight[i][j]) copy[i][j] = false;
      });
    });
    return copy;
  }, [board, isHighLight]);

  const getHightLightState = useCallback(
    (state: boolean[][], i, j) => {
      const copy = state.concat([]);
      board[i][j]?.placeCanMove.map((position) => {
        copy[position.i][position.j] = true;
      });
      return copy;
    },
    [board]
  );

  function clickHandler(e: any, i: number, j: number) {
    e.preventDefault();
    //it cant select if its not its turn
    if (turn !== playerNumber) {
      console.log("no es tu turno");

      return;
    }

    const element = board[i][j];

    if (!positionSelected.current && element.name == "") {
      console.log("position vacia");

      return;
    }

    if (!positionSelected.current && element.player !== playerNumber) {
      console.log("no es tu ficha");

      return;
    }

    if (element.player == playerNumber) {
      positionSelected.current = { i: i, j: j };
      const currentState = getHightLightState(getNormalState(), i, j);
      setIsHighLight(currentState);
      return;
    }

    if (positionSelected.current && element.player !== playerNumber) {
      const position = board[positionSelected.current.i][
        positionSelected.current.j
      ].placeCanMove.find((position) => position.i == i && position.j == j);
      if (position == undefined) {
        console.log("no te puedes mover alli");

        return;
      }

      try {
        emitPlay(positionSelected.current, position);
      } catch (e) {
        console.debug(e);
      }
      positionSelected.current = null;
    }
  }

  function displayBoard() {
    if (
      !(
        isHighLight.length == board.length &&
        isHighLight[isHighLight.length - 1].length ==
          board[board.length - 1].length
      )
    ) {
      return "loading";
    }
    return (
      <div
        className={playerNumber == 2 ? style.chess_board_r : style.chess_board}
      >
        {board.map((col, i) => (
          <div key={`row_${i}`} className={style.row}>
            {col.map((element, j) => (
              <ChessGrid
                piece={element}
                position={{ i, j }}
                clickHandler={clickHandler}
                key={`grid_${i}_${j}`}
                highLight={isHighLight[i][j]}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // useEffect(
  //   function initPaintBoard() {
  //     paintBoard();
  //   },
  //   [boardComponent, paintBoard]
  // );

  return <>{displayBoard()}</>;
}

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
