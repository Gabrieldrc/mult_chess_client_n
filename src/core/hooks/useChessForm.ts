import { setPlayerNumber } from "@appRedux/features/playerSlice";
import { useAppDispatch } from "@appRedux/hooks";
import { joinGame, newGame } from "@services/chess/client";
import { useRouter } from "next/router";
import { useState } from "react";

const useChessForm = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const newGameAction = async () => {
    try {
      const response = await newGame();
      const { access_token, player, room } = response.data;

      sessionStorage.setItem("player_token", access_token);
      dispatch(setPlayerNumber(player));
      router.push(`${router.pathname}/room/${room}`);
    } catch (e: any) {
      setError(e.message);
      return;
    }
  };

  const joinGameAction = async (roomId: string) => {
    try {
      const response = await joinGame(roomId);
      console.log(response);

      const { access_token, player, room } = response.data;

      if (access_token && player) {
        sessionStorage.setItem("player_token", access_token);
        dispatch(setPlayerNumber(player));
      }

      router.push(`${router.pathname}/room/${room}`);
    } catch (e: any) {
      setError(e.message);
      return;
    }
  };

  return { newGameAction, joinGameAction, error };
};

export default useChessForm;
