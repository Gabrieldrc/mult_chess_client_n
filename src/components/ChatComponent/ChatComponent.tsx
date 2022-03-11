import { useCallback, useRef } from "react";
import styleSheet from "./ChatComponent.module.sass";
import { useRouter } from "next/router";
import MessagesPrintComponent from "./MessagesPrintComponent";
import { useMessageListener } from "core/hooks/useMessageListener";

function ChatComponent() {
  const room = `${useRouter().query.room}`;
  const { messages, sendMessageAction } = useMessageListener();
  const send = sendMessageAction(room);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = useCallback(() => {
    const message = {
      name: createName(),
      message: messageInputRef.current?.value + "",
    };
    send(message);
  }, [room]);

  const keyPressedHandle = useCallback((e: KeyboardEvent) => {
    console.log(messageInputRef.current?.value);
    if (e.code !== "Enter") return;
    if (messageInputRef.current?.value.length == 0) return;
    sendMessage();
    messageInputRef.current?.value = "";
    e.preventDefault();
  }, []);

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

function createName() {
  const abc = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let name = "";
  for (let i = 0; i < 7; i++) {
    name += abc[Math.floor(Math.random() * abc.length)];
  }

  return name;
}
