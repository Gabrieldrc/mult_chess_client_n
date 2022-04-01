import axios from "axios";
import { endpointsAPI } from "@services/endpoints";

const getHttpClient = () => axios;

export const getChessState = (room: string) => {
  return getHttpClient().get(endpointsAPI.chess.getState(room));
};

export const newGame = () => {
  return getHttpClient().post(endpointsAPI.chess.newGame);
};

export const joinGame = (room: string) => {
  return getHttpClient().post(endpointsAPI.chess.joinGame(room));
};
