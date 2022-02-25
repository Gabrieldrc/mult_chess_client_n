import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatComponent from "@components/ChatComponent/ChatComponent";
import ChessComponent from "@components/ChessComponent/ChessComponent";
import { chessClient } from "@services/ChessClient";
import SocketService from "@services/SocketService";
import RoomCodeComponent from "@components/RoomCodeComponent/RoomCodeComponent";
import ChessClientWS from "@services/ChessClientWS";

const Room: NextPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const player = +localStorage.getItem("playerNumber");
  const [gameState, setGameState] = useState<any | null>(null);

  useEffect(() => {
    async function fetchInitialState() {
      const resp = await chessClient.getState(`${room}`);
      if (resp.status == 200) {
        setGameState({
          turn: resp.data["response"]["turn"],
          board: resp.data["response"]["board"],
        });
      }
    }
    fetchInitialState();
  }, []);
  
  useEffect(()=> {
    ChessClientWS.listen("gameStateUpdate", (response: any) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    ChessClientWS.listen("error", (response: any) => {
      console.error('Error socket', response.error)
    });
    return () => {
      ChessClientWS.removeAllListener();
      localStorage.clear()
    }
  }, []);

  return (
    <section className="flex-col full-vheight padding-g">
      <section className="full-height width-70">
        <RoomCodeComponent roomCode={room}/>
        <h1>{`Share your room code: ${room}`}</h1>
        {
        !gameState? '': (
        <>
          <h2>{`turn: ${gameState.turn}, player: ${player}`}</h2>
          <ChessComponent board={gameState.board} playerNumber={player} turn={gameState.turn}></ChessComponent>
        </>
        )
        }
      </section>
      <ChatComponent/>
    </section>
  );
};

export default Room;
