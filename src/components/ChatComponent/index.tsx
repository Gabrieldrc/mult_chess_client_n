import { useCallback, useRef } from "react";
import styleSheet from "./ChatComponent.module.sass";
import { useRouter } from "next/router";
import MessagesPrintComponent from "./MessagesPrintComponent";
import { useMessageListener } from "core/hooks/useMessageListener";
import { useAppSelector } from "@appRedux/hooks";

function ChatComponent() {
  const room = `${useRouter().query.room}`;
  const { messages, sendMessageAction } = useMessageListener(room);
  const send = sendMessageAction(room);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const username = useAppSelector((state) => state.user.username);

  const sendMessage = useCallback(() => {
    const message = {
      name: username,
      message: messageInputRef.current?.value + "",
    };
    send(message);
  }, [send, username]);

  const keyPressedHandle = (e: any) => {
    if (e.code !== "Enter") return;
    if (messageInputRef.current?.value.length == 0) return;
    sendMessage();
    messageInputRef.current.value = "";
    e.preventDefault();
  };

  return (
    <section className={styleSheet.chat_open}>
      <section className={styleSheet.message_sect}>
        <MessagesPrintComponent messages={messages} />
      </section>
      <section>
        <textarea
          name="input"
          id="chat_input"
          className={styleSheet.mess_input}
          onKeyPress={keyPressedHandle}
          ref={messageInputRef}
        ></textarea>
      </section>
    </section>
  );
}

export default ChatComponent;
