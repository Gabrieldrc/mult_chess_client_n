import IMessage from "@interfaces/IMessage";
import SocketService from "@interfaces/SocketService";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import SocketServiceImpl from "./SocketServiceImpl";

export default class ChatClientWS {
  private _singleton: SocketService | undefined = undefined;

  private getSocketService() {
    if (!this._singleton) {
      this._singleton = new SocketServiceImpl();
      this._singleton.setNamespace("/service/chat/");
    }

    return this._singleton;
  }
  //---listeners
  connectHandler(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("connect", callback);
  }

  newMessageHandler(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("message", callback);
  }

  //---emitters
  sendMessage(room: string, message: IMessage): void {
    this.getSocketService().emit("message", room, message);
  }

  joinChatRoom(room: string): void {
    this.getSocketService().emit("joinRoom", room);
  }

  removeAllListener(): void {
    this.getSocketService().removeAllListener();
  }

  removeNewMessageHandler(): void {
    this.getSocketService().removeListener("message");
  }

  disconnect(): void {
    this.getSocketService().disconnect();
  }

  getOptions() {
    return this.getSocketService().getOptions();
  }

  setOptions(options: Partial<ManagerOptions & SocketOptions>): void {
    this.getSocketService().setOptions(options);
  }
}
