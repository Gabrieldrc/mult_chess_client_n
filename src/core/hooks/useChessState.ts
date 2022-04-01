import { useEffect, useState } from "react";

import { useAppSelector } from "@appRedux/hooks";
import WSResError from "@interfaces/WSError";
import { getChessState } from "@services/chess/client";
import PieceInterface from "@interfaces/Piece.interface";
import {
  connectListener,
  connectWithTokenListener,
  joinGame,
  ErrorListener,
  event,
  gameUpdateListener,
  removeListeners,
} from "@services/chess/socketClient";

type gameState = {
  turn: number;
  board: PieceInterface[][];
};

const useChessState = (room: string) => {
  const player = useAppSelector((state) => state.player.playerNumber);
  const [gameState, setGameState] = useState<gameState>();

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await getChessState(room);
        const { turn, board } = response.data;
        setGameState({
          turn,
          board,
        });
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchInitialState();
  }, [room]);

  useEffect(() => {
    const token = sessionStorage.getItem("player_token");
    if (token)
      connectWithTokenListener(token, () =>
        console.log("connected ChessSocket with TOKEN")
      );
    else connectListener(() => console.log("connected ChessSocket"));
    joinGame(room);
    gameUpdateListener((response: any) => {
      console.log("se actualizo con: ", response);
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      } else setGameState({ turn: -1, board: [] });
    });

    ErrorListener((response: WSResError) => {
      console.error("Error socket", response.error);
    });
    return () => {
      removeListeners([event.UPDATE, event.ERROR]);
    };
  }, [room]);

  return { player, turn: gameState?.turn, board: gameState?.board };
};

export default useChessState;
