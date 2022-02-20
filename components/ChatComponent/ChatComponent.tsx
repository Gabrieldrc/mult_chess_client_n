import { NextComponentType } from "next";
import { useEffect, useState } from "react";

import style from "./ChatComponent.module.sass";

const MessageComponent: NextComponentType = (props) => {
  const message: string = props.message;
  const name: string = props.name;
  return (
    <div>
      <div>name</div>
      <div>message</div>
    </div>
  );
};

const ChatComponent: NextComponentType = () => {
  const [messages, setMessages] = useState([]);
  const keyPressedHandle = (e) => {
    if (e.code !== "Enter") return;

    console.log("Enter key pressed")
  }

  useEffect(() => {}, []);
  return (
    <section className={style.chat_open}>
      <section className=""></section>
      <section>
        <textarea
          name="input"
          id="chat_input"
          className={style.mess_input}
          onKeyPress={keyPressedHandle}
        ></textarea>
      </section>
    </section>
  );
};

export default ChatComponent;
