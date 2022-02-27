import { NextComponentType } from "next";
import { useEffect, useState } from "react";

import styleSheet from "./ChatComponent.module.sass";
import ChatClientWS from "@services/ChatClientWS";
import { useRouter } from "next/router";
import IMessage from "@interfaces/IMessage";

const userColors: any[] = [];
const messages: IMessage[] = []

const MessageComponent: NextComponentType = ({ name, children, color }) => {
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
};

const ChatComponent: NextComponentType = () => {
  // const [messages, setMessages] = useState<IMessage[]>([]);
  // const messages = [];
  const [flag, setFlag] = useState(false);
  const [messagesComp, setMessagesComp] = useState<any>([]);
  const [user, setUser] = useState("");
  const room: string = `${useRouter().query.room}`;

  useEffect(() => {
    localStorage.getItem("username");
  }, []);

  useEffect(() => {
    ChatClientWS.newMessageHandler((message) => {
      messages.push(message)
      setFlag(flag? false: true);
    });
  }, []);

  useEffect(() => {
    const elements = printMessages();
    setMessagesComp(elements)
  }, [flag]);

  const getUserHSLColorObj = (name: string) => {
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
  };

  const keyPressedHandle = (e: any) => {
    if (e.code !== "Enter") return;
    if (e.target.value.length == 0) return;

    const message = { name: createName(), message: e.target.value };
    ChatClientWS.sendMessage(room, message);
    e.target.value = "";
    e.preventDefault();
  };

  const printMessages = () => {
    return messages.map((messageObj, i) => {
      console.log(messageObj);
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
  };

  return (
    <section className={styleSheet.chat_open}>
      <section className={styleSheet.message_sect}>
        {messagesComp}
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
};

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
