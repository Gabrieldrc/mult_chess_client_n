import style from "./ChessComponent.module.sass";
import { useEffect, useState } from "react";
import Image from "next/image";
import PieceInterface from "@interfaces/Piece.interface";
import IPosition from "@interfaces/Position.interface";
import ChessClientWS from "@services/ChessClientWS";

type ChessProps = {
  board: PieceInterface[][];
  playerNumber: number;
  turn: number;
};

function ChessComponent({ board, playerNumber, turn }: ChessProps) {
  const PIECE_SRC = "/images/chess_pieces/";
  const [boardComponent, setBoardComponent] = useState(<></>);
  let positionSelected: IPosition | null = null;

  function paintBoard() {
    let flagRow = true;
    board.map((col, i) => {
      let flagCol = flagRow;
      col.map((elemtent, j) => {
        const bgclr = flagCol ? style.bc_1 : style.bc_2;
        const gridElement = document.getElementById(gridId(i, j));
        gridElement?.className = `${style.grid} ${bgclr}`;
        flagCol = !flagCol;
      });
      flagRow = !flagRow;
    });
  }

  function clickHandler(e: Event, i: number, j: number) {
    e.preventDefault();
    //it cant select if its not its turn
    if (turn !== playerNumber) {
      console.log("no es tu turno");

      return;
    }

    const element = board[i][j];

    if (!positionSelected && element.name == "") {
      console.log("position vacia");

      return;
    }

    if (!positionSelected && element.player !== playerNumber) {
      console.log("no es tu ficha");

      return;
    }

    if (element.player == playerNumber) {
      positionSelected = { i: i, j: j };
      paintBoard();
      const highlightPositions = board[i][j].placeCanMove;
      highlightPositions.map((position) => {
        const htmlElement = document.getElementById(
          gridId(position.i, position.j)
        );
        htmlElement?.className = `${style.grid} ${style.bc_hl}`;
      });

      console.log("seleccionaste una ficha");
      return;
    }

    if (positionSelected && element.player !== playerNumber) {
      const position = board[positionSelected.i][
        positionSelected.j
      ].placeCanMove.find((position) => position.i == i && position.j == j);
      if (position == undefined) {
        console.log("no te puedes mover alli");

        return;
      }
      console.log("play", {
        from: positionSelected,
        to: position,
      });

      ChessClientWS.emitPlay(positionSelected, position);
      positionSelected = null;
    }
  }

  useEffect(
    function createBoard() {
      const boardContents: any[] = [];

      board.map((col, i) => {
        const rowHtml: any[] = [];

        col.map((elemtent, j) => {
          const { name, player } = elemtent;
          const grid = (
            <div
              id={gridId(i, j)}
              key={`${i}${j}`}
              onClick={(e) => clickHandler(e, i, j)}
            >
              {elemtent.name == "" ? (
                ""
              ) : (
                <Image
                  src={`${PIECE_SRC}${name}_${player}.png`}
                  alt={`${i}${j}`}
                  layout="intrinsic"
                  width={50}
                  height={50}
                  key={`${PIECE_SRC}${name}_${player}`}
                  className={playerNumber == 2 ? style.rotate : ""}
                />
              )}
            </div>
          );

          rowHtml.push(grid);
        });

        boardContents.push(
          <div key={`row_${i}`} className={style.row}>
            {rowHtml}
          </div>
        );
      }, []);

      setBoardComponent(
        <div
          className={
            playerNumber == 2 ? style.chess_board_r : style.chess_board
          }
        >
          {boardContents}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [board]
  );

  useEffect(
    function initPaintBoard() {
      paintBoard();
    },
    [boardComponent]
  );

  return <>{boardComponent}</>;
}

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
