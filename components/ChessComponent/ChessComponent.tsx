import style from "./ChessComponent.module.sass";
import { Component, useEffect, useState } from "react";
import Image from "next/image";
import { NextComponentType } from "next";
import PieceInterface from "../../core/interfaces/Piece.interface";

const ChessComponent: NextComponentType = (props) => {
  const PIECE_SRC = "/images/chess_pieces/";
  let chessBoard: Array<Array<PieceInterface>> = props.board;
  const [board, setBoard] = useState(<></>);

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
    paintBoard();
    const highlightPositions = chessBoard[i][j].placeCanMove;
    highlightPositions.map((position) => {
      const element = document.getElementById(gridId(position.i, position.j));
      element?.className = `${style.grid} ${style.bc_hl}`;
    });
  };

  useEffect(() => {
    const createBoard = () => {
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
      });

      setBoard(<div className={style.chess_board}>{boardContents}</div>);
    };

    createBoard();
    paintBoard();
  }, []);

  return <>{board}</>;
};

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
