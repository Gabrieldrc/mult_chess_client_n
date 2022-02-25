import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import SocketService from "./SocketService";

export default class ChessClientWS extends SocketService {
  static getSocket(): Socket<DefaultEventsMap, DefaultEventsMap> {
    return super.getSocket({path: '/game/chess/'})
  }
}