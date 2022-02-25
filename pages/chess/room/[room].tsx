import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatComponent from "@components/ChatComponent/ChatComponent";
import ChessComponent from "@components/ChessComponent/ChessComponent";
import { chessClient } from "@services/ChessClient";
import SocketService from "@services/SocketService";
import RoomCodeComponent from "@components/RoomCodeComponent/RoomCodeComponent";
import ChessClientWS from "@services/ChessClientWS";
import style from "./room.module.sass";
import LoadingComponent from "@components/LoadingComponent/LoadingComponent";

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

  useEffect(() => {
    ChessClientWS.listen("gameStateUpdate", (response: any) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    ChessClientWS.listen("error", (response: any) => {
      console.error("Error socket", response.error);
    });
    return () => {
      ChessClientWS.removeAllListener();
      localStorage.clear();
    };
  }, []);

  return (
    <section className={style.page_section}>
      <section className={style.main_section}>
        <RoomCodeComponent roomCode={room} />
        <div className={style.center_content}>
          {/* <LoadingComponent/> */}
          {!gameState ? (
            "loading..."
          ) : (
            <div className={style.game_area}>
              <h2>{`turn: ${gameState.turn}, player: ${player}`}</h2>
              <ChessComponent
                board={gameState.board}
                playerNumber={player}
                turn={gameState.turn}
              ></ChessComponent>
            </div>
          )}
        </div>
      </section>
      <ChatComponent />
    </section>
  );
};

export default Room;
