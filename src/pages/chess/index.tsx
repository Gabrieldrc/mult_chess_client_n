import { MouseEvent, useRef } from "react";

import FormComponent from "@components/FormComponent";
import useChessForm from "@hooks/useChessForm";

function ChessIndex() {
  const room = useRef<HTMLInputElement>();
  const { newGameAction, joinGameAction, error } = useChessForm();

  function handleJoinRoomButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    joinGameAction(`${room.current?.value}`);
  }

  function handleNewGameButton(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    newGameAction();
  }

  return (
    <section className={"full-width full-vheight flex-center"}>
      <FormComponent>
        <input type="text" placeholder="Room" ref={room} />
        <button onClick={(event) => handleJoinRoomButton(event)}>
          Join Room
        </button>
        <p>or</p>
        <button onClick={(event) => handleNewGameButton(event)}>
          New Game
        </button>
        {error && (
          <span className={"error-form"}>
            <b>Error:</b>
            {error}
          </span>
        )}
      </FormComponent>
    </section>
  );
}

export default ChessIndex;
