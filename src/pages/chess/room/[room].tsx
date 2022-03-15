import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ChatComponent from "@components/ChatComponent";
import ChessComponent from "@components/ChessComponent";
import { getChessState } from "@services/chess/client";
import RoomCodeComponent from "@components/RoomCodeComponent";
import style from "./room.module.sass";
import { useAppSelector } from "@appRedux/hooks";
import WsResponse from "@interfaces/WsResponse";
import WSResError from "@interfaces/WSError";
import { useChatClientWS } from "@hooks/useChatClientWS";
import { useChessClientWS } from "@hooks/useChessClientWS";

function Room() {
  const router = useRouter();
  const room: string = router.query.room ? (router.query.room as string) : "";
  const player = useAppSelector((state) => state.player.playerNumber);
  const [gameState, setGameState] = useState<object | null>(null);
  const chatClientWS = useRef(useChatClientWS());
  const chessClientWS = useRef(useChessClientWS());

  useEffect(() => {
    async function fetchInitialState() {
      const resp = await getChessState(room);
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
    const toCleanChess = chessClientWS.current;
    chatClientWS.current.connectHandler(() => console.log("connected Chat"));
    chatClientWS.current.joinChatRoom(room);
    chessClientWS.current.gameStateUpdateListener((response: WsResponse) => {
      if (response.ok) {
        const data = response.data;

        setGameState(data);
      }
    });

    chessClientWS.current.ErrorListener((response: WSResError) => {
      console.error("Error socket", response.error);
    });
    return () => {
      toCleanChess.removeAllListener();
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
