import axios from "axios";
import { endpointsAPI } from "../api";

const getHttpClient = () => axios;

export const getChessState = (room: string) =>
  getHttpClient().get(endpointsAPI.chess.getState(room));
