import IMessage from "@interfaces/IMessage";
import SocketService from "@interfaces/SocketService";
import SocketServiceImpl from "./SocketServiceImpl";

export default class ChatClientWS {
  static _singleton: SocketService | undefined = undefined;

  static getSocketService() {
    if (!this._singleton) {
      this._singleton = new SocketServiceImpl();
      this._singleton.setNamespace("/service/chat/");
    }

    return this._singleton;
  }
  //---listeners
  static connectHandler(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("connect", callback);
  }

  static newMessageHandler(callback: (...arg: any[]) => void): void {
    this.getSocketService().listen("message", callback);
  }

  //---emitters
  static sendMessage(room: string, message: IMessage): void {
    this.getSocketService().emit("message", room, message);
  }

  static joinChatRoom(room: string): void {
    this.getSocketService().emit("joinRoom", room);
  }

  static removeAllListener(): void {
    this.getSocketService().removeAllListener();
  }

  static removeNewMessageHandler(): void {
    this.getSocketService().removeListener("message");
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
