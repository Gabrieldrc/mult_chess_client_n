import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatComponent from "../../../components/ChatComponent/ChatComponent";
import ChessComponent from "../../../components/ChessComponent/ChessComponent";
import { chessClient } from "../../../core/services/ChessClient";
import SocketService from "../../../core/services/SocketService";

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
    SocketService.listen("gameStateUpdate", (response: any) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    SocketService.listen("error", (response: any) => {
      console.error('Error socket', response.error)
    });
    return () => {
      SocketService.removeAllListener();
      localStorage.clear()
    }
  }, []);

  return (
    <section className="flex-col full-vheight">
      <section className="full-height width-70">
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
