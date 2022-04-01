import style from "./ChessComponent.module.sass";
import { useCallback, useRef } from "react";
import PieceInterface from "@interfaces/Piece.interface";
import IPosition from "@interfaces/Position.interface";
import { emitPlay } from "@services/chess/socketClient";
import ChessGrid from "@components/ChessGrid/ChessGrid";
import useChessPlay from "@hooks/useChessPlay";

type ChessProps = {
  board: PieceInterface[][];
  playerNumber: number;
  turn: number;
};

function ChessComponent({ board, playerNumber, turn }: ChessProps) {
  const positionSelected = useRef<IPosition>(null);
  const emitPlay = useChessPlay();

  const getNormalState = useCallback(() => {
    board.map((col, i) => {
      col.map((el, j) => {
        document.getElementById(gridId(i, j)).className = `${style.grid} ${
          (i + j) % 2 == 0 ? style.bc_1 : style.bc_2
        }`;
      });
    });
  }, [board]);

  const getHightLightState = useCallback(
    (i: number, j: number) => {
      board[i][j].placeCanMove.map((position) => {
        document.getElementById(
          gridId(position.i, position.j)
        ).className = `${style.grid} ${style.bc_hl}`;
      });
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
      getNormalState();
      getHightLightState(i, j);

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
        getNormalState();
      } catch (e) {
        console.debug(e);
      }
      positionSelected.current = null;
    }
  }

  function displayBoard() {
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
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <>{displayBoard()}</>;
}

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
