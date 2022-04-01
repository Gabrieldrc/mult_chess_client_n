import { useEffect, useState } from "react";

import IMessage from "@interfaces/IMessage";
import {
  connectHandler,
  joinChatRoom,
  newMessageHandler,
  removeNewMessageHandler,
  sendMessage,
} from "@services/chatWSClient";

export const useMessageListener = (room: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    connectHandler(() => console.log("connected Chat"));
    joinChatRoom(room);
  }, [room]);

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
