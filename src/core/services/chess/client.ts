import axios from "axios";
import { endpointsAPI } from "@services/endpoints";

const getHttpClient = () => axios;

export const getChessState = (room: string) =>
  getHttpClient().get(endpointsAPI.chess.getState(room));
