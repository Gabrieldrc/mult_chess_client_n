import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import MessageInterface from "@interfaces/MessageInterface";

import styleSheet from "./ChatComponent.module.sass";

const userColors: any[] = [];

const MessageComponent: NextComponentType = ({ name, children, color }) => {
  return (
    <div className={styleSheet.messageComp}>
      <div>
        <span className="nametagColor">
          {name}
        </span>
      </div>
      <p>{children}</p>
      <style jsx>
      {`
        .nametagColor {
          color: hsl(${color.h}deg, ${color.s}%, ${color.l}%)
        }
      `}
      </style>
    </div>
  );
};

const ChatComponent: NextComponentType = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    localStorage.getItem("username")
  },[]);

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
  }

  const keyPressedHandle = (e: any) => {
    if (e.code !== "Enter") return;

    const message: string = e.target.value;
    setMessages(messages.concat([{ name: createName(), message: message }]));
    e.target.value = "";
    e.preventDefault();
  };

  const printMessages = () => {
    return messages.map((messageObj, i) => {
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
      <section className={styleSheet.message_sect}>{printMessages()}</section>
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
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ]
  let name = "";
  for (let i = 0; i < 7; i++) {
    name += abc[Math.floor(Math.random() * abc.length)]
  }

  return name;
}