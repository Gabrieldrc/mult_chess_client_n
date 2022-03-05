import { useRouter } from "next/router";
import FormComponent from "@components/FormComponent/FormComponent";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import WsResponse from "@interfaces/WsResponse";
import ChessClientWS from "@services/ChessClientWS";
import { useAppDispatch } from "@appRedux/hooks";
import { setPlayerNumber } from "@appRedux/features/playerSlice";

function ChessIndex() {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    ChessClientWS.connectListener(() => console.log("connected"));
    ChessClientWS.newGameListener((response: WsResponse) => {
      if (response.ok) {
        console.log(`${router.pathname}/room/${response.data.room}`);
        if (response.data["playerNumber"]) {
          dispatch(setPlayerNumber(response.data["playerNumber"]));
        }
        router.push(`${router.pathname}/room/${response.data.room}`);
      }
    });
    ChessClientWS.ErrorListener((res) => {
      setError(res.data.error.message);
      console.log(res.data.error);
    });
  }, [dispatch, router]);

  function handleJoinRoomButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    ChessClientWS.emitJoinGame(room);
  }

  function handleRoomInputChange(event: ChangeEvent<HTMLInputElement>) {
    setRoom(event.target.value);
  }

  function handleNewGameButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    ChessClientWS.emitNewGame();
  }

  return (
    <section className={"full-width full-vheight flex-center"}>
      <FormComponent>
        <input
          type="text"
          placeholder="Room"
          onChange={(event) => handleRoomInputChange(event)}
        />
        <button onClick={(event) => handleJoinRoomButton(event)}>
          Join Room
        </button>
        <p>or</p>
        <button onClick={(event) => handleNewGameButton(event)}>
          New Game
        </button>
        {error ? (
          <span className={"error-form"}>
            <b>Error:</b>
            {error}
          </span>
        ) : (
          ""
        )}
      </FormComponent>
    </section>
  );
}

export default ChessIndex;
