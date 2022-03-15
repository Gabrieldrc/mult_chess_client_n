import IMessage from "@interfaces/IMessage";
import {
  newMessageHandler,
  removeNewMessageHandler,
  sendMessage,
} from "@services/chatWSClient";
import { useEffect, useState } from "react";

export const useMessageListener = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    newMessageHandler((message) => {
      setMessages([...messages, message]);
    });
    return () => {
      removeNewMessageHandler();
    };
  }, [messages]);

  const sendMessageAction = (room: string) => (message: IMessage) =>
    sendMessage(room, message);

  return {
    messages,
    sendMessageAction,
  };
};
