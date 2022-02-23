import { NextComponentType } from "next";
import style from "./RoomCodeComponent.module.sass";
import Image from "next/image";
import clipboard from "/public/icons/clipboard.svg";

const RoomCodeComponent: NextComponentType = ({ roomCode }) => {
  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(roomCode);

  };
  return (
    <div className={style.container}>
      <span>room code</span>
      <span className={style.roomCode} id="roomCode">{roomCode}</span>
      <div  className={style.iconContainer} onClick={copiarAlPortapapeles}>
        <Image alt="clipboard-icon" src={clipboard} layout="fixed"/>
      </div>
    </div>
  );
};

export default RoomCodeComponent;
