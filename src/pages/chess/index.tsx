import { useRouter } from "next/router";
import FormComponent from "@components/FormComponent";
import { useState, MouseEvent, useEffect, useRef } from "react";
import WsResponse from "@interfaces/WsResponse";
import { useAppDispatch } from "@appRedux/hooks";
import { setPlayerNumber } from "@appRedux/features/playerSlice";
import { useChessClientWS } from "@hooks/useChessClientWS";

function ChessIndex() {
  const room = useRef<HTMLInputElement>();
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const chessClientWS = useRef(useChessClientWS());

  useEffect(() => {
    chessClientWS.current.connectListener(() => console.log("connected"));
    chessClientWS.current.newGameListener((response: WsResponse) => {
      if (response.ok) {
        console.log(`${router.pathname}/room/${response.data.room}`);
        if (response.data["playerNumber"]) {
          dispatch(setPlayerNumber(response.data["playerNumber"]));
        }
        router.push(`${router.pathname}/room/${response.data.room}`);
      }
    });
    chessClientWS.current.ErrorListener((res) => {
      setError(res.data.error.message);
      console.log(res.data.error);
    });
  }, [dispatch, router]);

  function handleJoinRoomButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    chessClientWS.current.emitJoinGame(`${room.current?.value}`);
  }

  function handleNewGameButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    chessClientWS.current.emitNewGame();
  }

  return (
    <section className={"full-width full-vheight flex-center"}>
      <FormComponent>
        <input type="text" placeholder="Room" ref={room} />
        <button onClick={(event) => handleJoinRoomButton(event)}>
          Join Room
        </button>
        <p>or</p>
        <button onClick={(event) => handleNewGameButton(event)}>
          New Game
        </button>
        {error && (
          <span className={"error-form"}>
            <b>Error:</b>
            {error}
          </span>
        )}
      </FormComponent>
    </section>
  );
}

export default ChessIndex;
