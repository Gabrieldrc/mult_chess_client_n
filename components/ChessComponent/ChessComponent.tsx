import style from "./ChessComponent.module.sass";
import { Component, useEffect, useState } from "react";
import Image from "next/image";
import { NextComponentType } from "next";
import PieceInterface from "../../core/interfaces/Piece.interface";
import PositionInterface from "../../core/interfaces/Position.interface";
import SocketService from "../../core/services/SocketService";

const ChessComponent: NextComponentType = (props) => {
  const PIECE_SRC = "/images/chess_pieces/";
  let chessBoard: Array<Array<PieceInterface>> = props.board;
  const [board, setBoard] = useState(<></>);
  let selectedPiecePosition: PositionInterface | null = null 

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

    if (selectedPiecePosition) {
      const isAMoveablePlace = chessBoard[selectedPiecePosition.i][selectedPiecePosition.j]
        .placeCanMove.some(position => position.i == i && position.j == j);
      if (isAMoveablePlace) {
        SocketService.emit("play", {from: selectedPiecePosition, to: { i, j}});
        selectedPiecePosition = null;
        return;
      }
    }

    paintBoard();
    const highlightPositions = chessBoard[i][j].placeCanMove;
    highlightPositions.map((position) => {
      const element = document.getElementById(gridId(position.i, position.j));
      element?.className = `${style.grid} ${style.bc_hl}`;
    });
    selectedPiecePosition = { i, j}

    return
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
  }, [props.board]);

  return <>{board}</>;
};

export default ChessComponent;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
