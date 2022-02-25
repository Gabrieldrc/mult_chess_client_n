import { NextPage } from "next";
import { useRouter } from "next/router";
import FormComponent from "@components/FormComponent/FormComponent";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import SocketService from "@services/SocketService";
import WsResponse from "@interfaces/WsResponse";
import ChessClientWS from "@services/ChessClientWS";

const ChessIndex: NextPage = () => {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    ChessClientWS.listen("connect", () => console.log("connected"));
    ChessClientWS.listen("newGame", (response: WsResponse) => {
      if (response.ok) {
        console.log(`${router.pathname}/room/${response.data.room}`);
        if (response.data['playerNumber']) {
          localStorage.setItem('playerNumber', response.data['playerNumber'])
        }
        router.push(`${router.pathname}/room/${response.data.room}`);
      }
    });
    ChessClientWS.listen("error", (res) => {
      setError(res.data.error.message)
      console.log(res.data.error);
      
    })
  }, []);
  const handleJoinRoomButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ChessClientWS.emit("joinGame", room);
  };

  const handleRoomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
  };

  const handleNewGameButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ChessClientWS.emit("newGame");
  };

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
        {
          error? <span className={"error-form"}><b>Error:</b>{error}</span> : ""
        }
        
      </FormComponent>
    </section>
  );
};

export default ChessIndex;
