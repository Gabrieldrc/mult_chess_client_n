import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { chessClient } from "../../../core/services/ChessClient";
import SocketService from "../../../core/services/SocketService";
const Room: NextPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const [turn, setTurn] = useState(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function fetchInitialState() {
      const resp = await chessClient.getState(`${room}`);
      if (resp.status == 200) {
        setBoard(resp.data['response']['board'])
        setTurn(resp.data['response']['turn'])
      }
    }
    fetchInitialState();
    // SocketService.listen()
  }, []);

  return (
    <h1>{`Share your room code: ${room}`}</h1>
  );
};

export default Room;
