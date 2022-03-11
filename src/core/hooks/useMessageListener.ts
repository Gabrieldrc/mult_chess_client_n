import IMessage from "@interfaces/IMessage";
import { useEffect, useRef, useState } from "react";
import { useChatClientWS } from "./useChatClientWS";

export const useMessageListener = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatSocketClient = useRef(useChatClientWS());

  useEffect(() => {
    const clientToCleanUp = chatSocketClient.current;
    chatSocketClient.current.newMessageHandler((message) => {
      setMessages([...messages, message]);
    });
    return () => {
      clientToCleanUp.removeNewMessageHandler();
    };
  }, [messages]);

  const sendMessageAction = (room: string) => (message: IMessage) =>
    chatSocketClient.current.sendMessage(room, message);

  return {
    messages,
    sendMessageAction,
  };
};
