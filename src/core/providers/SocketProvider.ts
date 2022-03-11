import ChatClientWS from "@services/ChatClientWS";
import ChessClientWS from "@services/ChessClientWS";
import { createContext, useContext } from "react";

export const WebSocketContext = createContext<any>(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const getWS = () => {
  console.debug(
    "Se ejecuto la funcion getWS por ende se volvieron a definir las clases"
  );

  const socketsClients = {
    chatSocketClient: ChatClientWS,
    chessSocketClient: ChessClientWS,
  };

  return socketsClients;
};
