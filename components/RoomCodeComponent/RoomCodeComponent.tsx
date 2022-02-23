import { NextComponentType } from "next";
import style from "./RoomCodeComponent.module.sass";
import Image from "next/image";
import clipboardSrc from "/public/icons/clipboard-fill.svg";
import clipboardCheckSrc from "/public/icons/clipboard-check-fill.svg";
import { useState } from "react";

const RoomCodeComponent: NextComponentType = ({ roomCode }) => {
  const [imgSrc, setImgSrc] = useState(clipboardSrc);
  const [showPopout, setShowPopout] = useState(false);
  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(roomCode);
    setImgSrc(clipboardCheckSrc);
    setShowPopout(true)
    setTimeout(()=> {
      setImgSrc(clipboardSrc)
      setShowPopout(false)
    }, 3000)
  };

  const selectContent = (e: Event) => {
    e.preventDefault();
    e.target.select();
    e.target.setSelectionRange(0, 99999);
  };
  return (
    <div className={style.container}>
      <span>room code</span>
      <input
        type="text"
        onClick={selectContent}
        className={style.roomCode}
        id="roomCode"
        value={roomCode}
        readOnly
      />
      <div className={style.button} onClick={copiarAlPortapapeles}>
        <Image alt="clipboard-icon" src={imgSrc} layout="fixed" />
      </div>
      {
        !showPopout? "" :
        <div className={style.popout}>copied!</div>
      }
    </div>
  );
};

export default RoomCodeComponent;
