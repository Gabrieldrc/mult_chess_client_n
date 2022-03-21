import styleSheet from "./ChatComponent.module.sass";
import HSLColor from "@interfaces/HSLColor.interface";
import IMessage from "@interfaces/IMessage";
import { ReactNode, useEffect, useRef } from "react";

type UserColors = { name: string; color: HSLColor };
type ComponenProps = {
  messages: IMessage[];
};
function MessagesPrintComponent({ messages }: ComponenProps) {
  const userColors = useRef<UserColors[]>([]);
  function getUserHSLColorObj(name: string) {
    let element = userColors.current.find((ele) => ele.name === name);

    if (!element) {
      element = {
        name: name,
        color: {
          h: Math.floor(Math.random() * 359),
          s: 100,
          l: 50,
        },
      };
      userColors.current = userColors.current.concat([element]);
    }

    return element.color;
  }
  return (
    <>
      {messages.map((messageObj, i) => {
        return (
          <MessageComponent
            name={messageObj.name}
            key={`${i}-${messageObj.name}-message`}
            color={getUserHSLColorObj(messageObj.name)}
            lastMessage={i == messages.length - 1}
          >
            {messageObj.message}
          </MessageComponent>
        );
      })}
    </>
  );
}

export default MessagesPrintComponent;

type MessageProps = {
  name: string;
  color: HSLColor;
  lastMessage: boolean;
  children: ReactNode;
};

function MessageComponent({
  name,
  children,
  color,
  lastMessage,
}: MessageProps) {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref && lastMessage) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      console.log("scrolleo");
    }
  }, [ref, lastMessage]);
  return (
    <div className={styleSheet.messageComp} ref={ref}>
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
/*

}

export default MessagesPrintComponent;

*/
