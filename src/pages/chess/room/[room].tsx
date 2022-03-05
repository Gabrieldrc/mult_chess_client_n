import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatComponent from "@components/ChatComponent/ChatComponent";
import ChessComponent from "@components/ChessComponent/ChessComponent";
import { chessClient } from "@services/ChessClient";
import RoomCodeComponent from "@components/RoomCodeComponent/RoomCodeComponent";
import ChessClientWS from "@services/ChessClientWS";
import style from "./room.module.sass";
import ChatClientWS from "@services/ChatClientWS";
import { useAppSelector } from "@appRedux/hooks";
import WsResponse from "@interfaces/WsResponse";
import WSResError from "@interfaces/WSError";

function Room() {
  const router = useRouter();
  const room: string = router.query.room;
  const player = useAppSelector((state) => state.player.playerNumber);
  const [gameState, setGameState] = useState<object | null>(null);

  useEffect(() => {
    async function fetchInitialState() {
      const resp = await chessClient.getState(room);
      if (resp.status == 200) {
        setGameState({
          turn: resp.data["response"]["turn"],
          board: resp.data["response"]["board"],
        });
      }
    }
    fetchInitialState();
  }, [room]);

  useEffect(() => {
    ChatClientWS.connectHandler(() => console.log("connected Chat"));
    ChatClientWS.joinChatRoom(room);
    ChessClientWS.gameStateUpdateListener((response: WsResponse) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    ChessClientWS.ErrorListener((response: WSResError) => {
      console.error("Error socket", response.error);
    });
    return () => {
      ChessClientWS.removeAllListener();
    };
  }, [room]);

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
}

export default Room;
