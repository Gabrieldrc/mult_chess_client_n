import { NextPage } from "next";
import { useRouter } from "next/router";
import FormComponent from "../../components/form/FormComponent";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import SocketService from "../../core/services/SocketService";
import WsResponse from "../../core/interfaces/WsResponse";

const ChessIndex: NextPage = () => {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    SocketService.listen("connect", () => console.log("connected"));
    SocketService.listen("newGame", (response: WsResponse) => {
      if (response.ok) {
        console.log(`${router.pathname}/room/${response.data.room}`);
        if (response.data['playerNumber']) {
          localStorage.setItem('playerNumber', response.data['playerNumber'])
        }
        router.push(`${router.pathname}/room/${response.data.room}`);
      }
    });
    SocketService.listen("error", (res) => {
      setError(res.data.error.message)
      console.log(res.data.error);
      
    })
  }, []);
  const handleJoinRoomButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    SocketService.emit("joinGame", room);
  };

  const handleRoomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
  };

  const handleNewGameButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    SocketService.emit("newGame");
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
