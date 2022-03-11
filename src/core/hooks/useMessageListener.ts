import IMessage from "@interfaces/IMessage";
import ChatClientWS from "@services/ChatClientWS";
import { useEffect, useState } from "react";

export const useMessageListener = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    ChatClientWS.newMessageHandler((message) => {
      setMessages([...messages, message]);
    });
    return () => {
      ChatClientWS.removeNewMessageHandler();
    };
  }, [messages]);

  const sendMessageAction = (room: string) => (message: IMessage) =>
    ChatClientWS.sendMessage(room, message);

  return {
    messages,
    sendMessageAction,
  };
};
