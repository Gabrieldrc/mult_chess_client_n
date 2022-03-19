import { useAppSelector } from "@appRedux/hooks";
import WSResError from "@interfaces/WSError";
import WsResponse from "@interfaces/WsResponse";
import { getChessState } from "@services/chess/client";
import { useEffect, useState } from "react";
import PieceInterface from "@interfaces/Piece.interface";
import * as chessSocketClient from "@services/chess/socketClient";

type gameState = {
  turn: number;
  board: PieceInterface[][];
};

const useChessState = (room: string) => {
  const player = useAppSelector((state) => state.player.playerNumber);
  const [gameState, setGameState] = useState<gameState>();

  useEffect(() => {
    const fetchInitialState = async () => {
      const resp = await getChessState(room);
      if (resp.status == 200) {
        setGameState({
          turn: resp.data["response"]["data"]["turn"],
          board: resp.data["response"]["data"]["board"],
        });
      }
    };
    fetchInitialState();
  }, [room]);

  useEffect(() => {
    chessSocketClient.gameStateUpdateListener((response: WsResponse) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    chessSocketClient.ErrorListener((response: WSResError) => {
      console.error("Error socket", response.error);
    });
    return () => {
      chessSocketClient.removeAllListener();
    };
  }, [room]);

  return { player, turn: gameState?.turn, board: gameState?.board };
};

export default useChessState;
