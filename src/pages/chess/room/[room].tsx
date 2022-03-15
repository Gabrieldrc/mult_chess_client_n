import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatComponent from "@components/ChatComponent";
import ChessComponent from "@components/ChessComponent";
import RoomCodeComponent from "@components/RoomCodeComponent";
import style from "./room.module.sass";
import useChessState from "@hooks/useChessState";
import PieceInterface from "@interfaces/Piece.interface";
import * as chatWSClient from "@services/chatWSClient";

function Room() {
  const router = useRouter();
  const room: string = router.query.room ? (router.query.room as string) : "";
  const { board, player, turn } = useChessState(room);

  useEffect(() => {
    chatWSClient.connectHandler(() => console.log("connected Chat"));
    chatWSClient.joinChatRoom(room);
  }, [room]);

  const renderChessContent = () => {
    if (!player || !turn || !board) {
      return "loading...";
    }
    return (
      <div className={style.game_area}>
        <h2>{`turn: ${turn}, player: ${player}`}</h2>
        <ChessComponent
          board={board as PieceInterface[][]}
          playerNumber={player}
          turn={turn as number}
        ></ChessComponent>
      </div>
    );
  };

  return (
    <section className={style.page_section}>
      <section className={style.main_section}>
        <RoomCodeComponent roomCode={room} />
        <div className={style.center_content}>
          {/* <LoadingComponent/> */}
          {renderChessContent()}
        </div>
      </section>
      <ChatComponent />
    </section>
  );
}

export default Room;
