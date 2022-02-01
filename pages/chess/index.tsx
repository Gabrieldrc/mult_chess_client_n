import { NextPage } from "next";
import { useRouter } from "next/router";
import FormComponent from "../../components/form/FormComponent";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import SocketService from "../../core/services/SocketService";
import WsResponse from "../../core/interfaces/WsResponse";
const ChessIndex: NextPage = () => {
  const [room, setRoom] = useState("");
  const router = useRouter();

  useEffect(() => {
    SocketService.listen("connect", () => console.log("connected"));
    SocketService.listen("newGame", (response: WsResponse) => {
      if (response.ok) {
        console.log(`${router.pathname}/room/${response.data.room}`);
        router.push(`${router.pathname}/room/${response.data.room}`);
      }
    });
  }, []);
  const handleJoinRoomButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(room);
    // SocketService.emit("joinGame", room, (response: any) => {
    //   if (response.status == "ok") {
    //   }
    // });
  };
  const handleRoomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
  };
  const handleNewGameButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    SocketService.emit("newGame");
  };
  return (
    <section className={"full-width full-height flex-center"}>
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
      </FormComponent>
    </section>
  );
};

export default ChessIndex;
