import ChatClientWS from "@services/ChatClientWS";
import { useWebSocketContext } from "core/providers/SocketProvider";

export function useChatClientWS(): ChatClientWS {
  const { chatSocketClient } = useWebSocketContext();
  return chatSocketClient;
}
