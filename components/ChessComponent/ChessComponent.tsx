import style from "./ChessComponent.module.sass";
import { Component, useEffect } from "react";
import Image from "next/image";
import { NextComponentType } from "next";
import PieceInterface from "../../core/interfaces/Piece.interface";

const ChessComponent: NextComponentType = (props) => {
  const PIECE_SRC = "/images/chess_pieces/";
  let chessBoard: Array<Array<PieceInterface>> = props.board;

  const clickHandler = (e: Event) => {
    e.preventDefault();
    console.log(e);
  };
  const createBoard = () => {
    const boardContents: any[] = [];
    let flagRow = true;
    chessBoard.map((col, i) => {
      const rowHtml: any[] = [];
      let flagCol = flagRow
      col.map((elemtent, j) => {
        const {name, player} = elemtent;
        const bgclr = flagCol? style.bc_1 : style.bc_2;
        const grid = (
          <div id={`chess-grid-${i}${j}`} key={`${i}${j}`} className={`${style.grid} ${bgclr}`} onClick={clickHandler}>
            {
              elemtent.name == ""? "" :
              <Image src={`${PIECE_SRC}${name}_${player}.png`} alt={`${i}${j}`} layout="intrinsic" width={50} height={50} key={`${PIECE_SRC}${name}_${player}`}/>
            }
          </div>
        );
        flagCol = !flagCol;
        rowHtml.push(grid);
      });
      flagRow = !flagRow;
      boardContents.push(<div key={`row_${i}`} className={style.row}>{rowHtml}</div>);
    });

    return (<div className={style.chess_board}>{boardContents}</div>);
  };

  return <>{createBoard()}</>;
};

export default ChessComponent;

/*
function createHtml(boardData: Array<Array<PieceInterface>>) {
  gameSection = ''
  for (let i = 0; i < boardData.length; i++) {
      const container = document.createElement('div')
      container.classList.add('grid_8_col')
      for (let j = 0; j < boardData[i].length; j++) {
          const grid = document.createElement('div')
          grid.id = 'chess-grid-' + i + j
          grid.classList.add('grid_1')
          let element: PieceInterface = boardData[i][j];
          if (element.name !== '') {
              grid.classList.add(element.name + '_' + element.player)
          }
          container.appendChild(grid)
      }
      gameSection.appendChild(container)
  }
  formPageSection.style.display = "none"
  gamePageSection.style.display = "flex"
  if (playerNumber == 2) {
      gameSection.style.flexDirection = "column-reverse"
  }
}
function saveElement(boardData: Array<Array<PieceInterface>>) {
  chessGrids = []
  for (let i = 0; i < boardData.length; i++) {
      chessGrids.push([])
      for (let j = 0; j < boardData[i].length; j++) {
          const element = document.getElementById("chess-grid-" + i + j)
          element.addEventListener('click', gridHandler)
          chessGrids[i].push(element)
      }
  }
}
function gridHandler(e: Event) {
    if (playerNumber !== gameData.turn) {
        return
    }
    const i = this.id[this.id.length - 2]
    const j = this.id[this.id.length - 1]
    const element = gameData.board[i][j]
    console.log(element)
    if (pieceSelected == null && element.name == "") {
        return
    }
    if (element.player !== gameData.turn && pieceSelected == null) {
        return
    }
    if (element.player == gameData.turn) {
        pieceSelected = {i: i, j: j}
        console.log("Piece " + i + ", " + j + ": " + element.name)
        console.log(element)
        paintChessBoard()
        element.placeCanMove.map( position => {
            chessGrids[position.i][position.j].style.backgroundColor = "blue"
        })
        return
    }
    if (pieceSelected != null && (element.player !== gameData.turn)) {
        const position = gameData.board[pieceSelected.i][pieceSelected.j].placeCanMove.find(a => a.i == i && a.j == j)
        if (position == undefined) {
            return
        }
        movePiece(pieceSelected, position)
        pieceSelected = null
    }
}
function paintChessBoard() {
    let flag = true
    for (let i = 0; i < chessGrids.length; i++) {
        for (let j = 0; j < chessGrids[i].length; j++) {
            chessGrids[i][j].style.backgroundColor = flag? "brown" : "beige"
            flag = !flag
        }
        flag = !flag
    }
}
function chessInit(boardData: Array<Array<PieceInterface>>) {
  createHtml(boardData);
  saveElement(boardData);
}
*/
