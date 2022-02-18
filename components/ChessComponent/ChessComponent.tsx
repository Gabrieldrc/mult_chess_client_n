import style from "./ChessComponent.module.sass";
import { Component, useEffect, useState } from "react";
import Image from "next/image";
import { NextComponentType } from "next";
import PieceInterface from "../../core/interfaces/Piece.interface";
import PositionInterface from "../../core/interfaces/Position.interface";
import SocketService from "../../core/services/SocketService";

const ChessComponent: NextComponentType = ({ board, playerNumber, turn }) => {
  const PIECE_SRC = "/images/chess_pieces/";
  let chessBoard: Array<Array<PieceInterface>> = board;
  let player: number = playerNumber;
  const [boardComponent, setBoardComponent] = useState(<></>);
  let positionSelected: PositionInterface | null = null;

  const paintBoard = () => {
    let flagRow = true;
    chessBoard.map((col, i) => {
      let flagCol = flagRow;
      col.map((elemtent, j) => {
        const bgclr = flagCol ? style.bc_1 : style.bc_2;
        document.getElementById(
          gridId(i, j)
        )?.className = `${style.grid} ${bgclr}`;
        flagCol = !flagCol;
      });
      flagRow = !flagRow;
    });
  };

  const clickHandler = (e: Event, i: number, j: number) => {
    e.preventDefault();
    //it cant select if its not its turn
    if (turn !== player) {
      console.log("no es tu turno");
      
      return;
    }

    const element = chessBoard[i][j];

    if (!positionSelected && element.name == "") {
      console.log("position vacia");
      
      return;
    }

    if (!positionSelected && element.player !== player) {
      console.log("no es tu ficha");
      
      return;
    }

    if (element.player == player) {
      positionSelected = { i: i, j: j };
      paintBoard();
      const highlightPositions = chessBoard[i][j].placeCanMove;
      highlightPositions.map((position) => {
        const htmlElement = document.getElementById(
          gridId(position.i, position.j)
        );
        htmlElement?.className = `${style.grid} ${style.bc_hl}`;
      });

      console.log("seleccionaste una ficha");
      return;
    }

    if (positionSelected && element.player !== player) {
      const position = chessBoard[positionSelected.i][
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
      
      SocketService.emit("play", {
        from: positionSelected,
        to: position,
      });
      positionSelected = null;
    }
  };

  useEffect(
    function createBoard() {
      const boardContents: any[] = [];

      chessBoard.map((col, i) => {
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
        <div className={style.chess_board}>{boardContents}</div>
      );
    },
    [board]
  );

  useEffect(
    function initPaintBoard() {
      paintBoard();
    },
    [boardComponent]
  );

  return <>{boardComponent}</>;
};

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
