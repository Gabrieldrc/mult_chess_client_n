import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import style from "@components/ChessComponent/ChessComponent.module.sass";
import { useAppSelector } from "@appRedux/hooks";
import PieceInterface from "@interfaces/Piece.interface";
import { endpointsImage } from "@services/endpoints";
import IPosition from "@interfaces/Position.interface";

type ChessGridProps = {
  piece: PieceInterface;
  clickHandler: (e: any, i: number, j: number) => void;
  position: IPosition;
};
function ChessGrid({ piece, clickHandler, position }: ChessGridProps) {
  const playerNumber = useAppSelector((state) => state.player.playerNumber);
  const { i, j } = position;
  const originalBgclr = useRef((i + j) % 2 == 0 ? style.bc_1 : style.bc_2);

  return (
    <div
      id={gridId(i, j)}
      onClick={(e) => clickHandler(e, i, j)}
      className={`${originalBgclr.current} ${style.grid}`}
    >
      {piece.name == "" ? (
        ""
      ) : (
        <Image
          src={endpointsImage.chess.piece.getImage(piece.name, piece.player)}
          alt={`${i}${j}`}
          layout="intrinsic"
          width={50}
          height={50}
          className={playerNumber == 2 ? style.rotate : ""}
        />
      )}
    </div>
  );
}

export default ChessGrid;

function gridId(i: number, j: number): string {
  return `chess-grid-${i}${j}`;
}
