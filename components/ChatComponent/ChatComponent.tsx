import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import MessageInterface from "../../core/interfaces/MessageInterface";

import styleSheet from "./ChatComponent.module.sass";

const userColors: any[] = [];

const MessageComponent: NextComponentType = ({ name, children, style }) => {
  return (
    <div className={styleSheet.messageComp}>
      <div>
        <span
          style={style}
        >
          {name}
        </span>
      </div>
      <p>{children}</p>
    </div>
  );
};

const ChatComponent: NextComponentType = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const getUserColorStyle = (name: string) => {
    let element = userColors.find((ele) => ele.name === name);

    if (!element) {
      element = {
        name: name,
        color: {
          r: 0,
          g: Math.random() * 255,
          b: Math.random() * 255,
        },
      };
      userColors.push(element);
    }
    
    return {
      color: `rgb(${element.color.r}, ${element.color.g}, ${element.color.b})`,
    }
  }
  

  const keyPressedHandle = (e: any) => {
    if (e.code !== "Enter") return;

    const message: string = e.target.value;
    setMessages(messages.concat([{ name: "pepito", message: message }]));
    e.target.value = "";
    e.preventDefault();
  };

  const printMessages = () => {
    return messages.map((messageObj, i) => {
      const styleObj = getUserColorStyle(messageObj.name);
      return (
        <MessageComponent
          name={messageObj.name}
          key={`${i}-${messageObj.name}-message`}
          style={styleObj}
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
