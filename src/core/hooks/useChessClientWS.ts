import ChessClientWS from "@services/ChessClientWS";
import { useWebSocketContext } from "core/providers/SocketProvider";

export function useChessClientWS(): ChessClientWS {
  const { chessSocketClient } = useWebSocketContext();
  return chessSocketClient;
}
