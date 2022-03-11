import ChatClientWS from "@services/ChatClientWS";
import { createContext, useContext } from "react";

export const WebSocketContext = createContext<any>(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const getWS = () => {
  const socketsClients = {
    chatSocketClient: new ChatClientWS(),
  };

  return socketsClients;
};
