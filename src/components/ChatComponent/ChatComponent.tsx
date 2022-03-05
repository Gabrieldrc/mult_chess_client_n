import { ReactNode, useEffect, useState } from "react";
import styleSheet from "./ChatComponent.module.sass";
import ChatClientWS from "@services/ChatClientWS";
import { useRouter } from "next/router";
import IMessage from "@interfaces/IMessage";
import HSLColor from "@interfaces/HSLColor.interface";

const userColors: any[] = [];

function ChatComponent() {
  const room = `${useRouter().query.room}`;
  const [messages, setMessages] = useState<IMessage[]>([]);

  function printMessages(msgs: IMessage[]) {
    return msgs.map((messageObj, i) => {
      return (
        <MessageComponent
          name={messageObj.name}
          key={`${i}-${messageObj.name}-message`}
          color={getUserHSLColorObj(messageObj.name)}
        >
          {messageObj.message}
        </MessageComponent>
      );
    });
  }

  useEffect(() => {
    ChatClientWS.newMessageHandler((message) => {
      setMessages([...messages, message]);
    });
    return () => {
      ChatClientWS.removeNewMessageHandler();
    };
  }, [messages]);

  function getUserHSLColorObj(name: string) {
    let element = userColors.find((ele) => ele.name === name);

    if (!element) {
      element = {
        name: name,
        color: {
          h: Math.floor(Math.random() * 359),
          s: 100,
          l: 50,
        },
      };
      userColors.push(element);
    }

    return element.color;
  }

  function keyPressedHandle(e: any) {
    if (e.code !== "Enter") return;
    if (e.target.value.length == 0) return;

    const message = { name: createName(), message: e.target.value };
    ChatClientWS.sendMessage(room, message);
    e.target.value = "";
    e.preventDefault();
  }

  return (
    <section className={styleSheet.chat_open}>
      <section className={styleSheet.message_sect}>
        {printMessages(messages)}
      </section>
      <section>
        <textarea
          name="input"
          id="chat_input"
          className={styleSheet.mess_input}
          onKeyPress={keyPressedHandle}
        ></textarea>
      </section>
    </section>
  );
}

type MessageProps = {
  name: string;
  color: HSLColor;
  children: ReactNode;
};

function MessageComponent({ name, children, color }: MessageProps) {
  return (
    <div className={styleSheet.messageComp}>
      <div>
        <span className="nametagColor">{name}</span>
      </div>
      <p>{children}</p>
      <style jsx>
        {`
          .nametagColor {
            color: hsl(${color.h}deg, ${color.s}%, ${color.l}%);
          }
        `}
      </style>
    </div>
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
