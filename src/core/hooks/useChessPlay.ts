import IPosition from "@interfaces/Position.interface";
import { play } from "@services/chess/socketClient";

const useChessPlay = () => {
  const playAction = (from: IPosition, to: IPosition) => {
    const token = sessionStorage.getItem("player_token");
    if (!token) return;
    play(from, to);
  };

  return playAction;
};

export default useChessPlay;
