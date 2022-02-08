import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChessComponent from "../../../components/ChessComponent/ChessComponent";
import WsResponse from "../../../core/interfaces/WsResponse";
import { chessClient } from "../../../core/services/ChessClient";
import SocketService from "../../../core/services/SocketService";
const Room: NextPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const [turn, setTurn] = useState(-1);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function fetchInitialState() {
      const resp = await chessClient.getState(`${room}`);
      if (resp.status == 200) {
        setBoard(resp.data["response"]["board"]);
        setTurn(resp.data["response"]["turn"]);
      }
    }
    fetchInitialState();

    SocketService.listen("gameStateUpdate", (response: any) => {
      if (response.ok) {
        console.log(response.data["board"]);
        console.log(response.data["turn"]);
        setBoard(response.data["board"]);
        setTurn(response.data["turn"]);
        
      }
    });

    SocketService.listen("error", (response: any) => {
      console.error('Error socket', response.error)
    });

  }, []);

  return (
    <>
      <h1>{`Share your room code: ${room}`}</h1>
       <h2>{turn != -1? turn: ''}</h2>
      {board ? <ChessComponent board={board} room={room}></ChessComponent> : ""}
    </>
  );
};

export default Room;
