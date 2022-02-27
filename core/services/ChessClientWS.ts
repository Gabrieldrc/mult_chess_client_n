import IPosition from "@interfaces/Position.interface";
import SocketService from "@interfaces/SocketService";
import { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import SocketServiceImpl from "./SocketServiceImpl";

export default class ChessClientWS {
  static _singleton: SocketService | undefined = undefined;

  static getSocketService() {
    if (!this._singleton) {
      this._singleton = new SocketServiceImpl();
      this._singleton.setNamespace("/game/chess/");
    }
    return this._singleton;
  }
//---listeners
  static connectListener(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("connect", callback);
  }

  static newGameListener(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("newGame", callback);
  }

  static gameStateUpdateListener(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("gameStateUpdate", callback);
  }

  static ErrorListener(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("error", callback);
  }

//---emmitters
  static emitNewGame(): void {
    this.getSocketService().emit("newGame");
  }

  static emitJoinGame(room: string): void {
    this.getSocketService().emit("joinGame", room);
  }

  static emitPlay(from: IPosition, to: IPosition): void {
    this.getSocketService().emit("play", from, to);
  }

  static removeAllListener(): void {
    this.getSocketService().removeAllListener();
  }

  static emit(event: string, ...data: any[]): void {
    this.getSocketService().emit(event, data);
  }

  static disconnect(): void {
    this.getSocketService().disconnect();
  }

  static getOptions() {
    return this.getSocketService().getOptions();
  }

  static setOptions(options: Partial<ManagerOptions & SocketOptions>): void {
    this.getSocketService().setOptions(options);
  }
}
