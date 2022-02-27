import SocketService from "@interfaces/SocketService";
import { Socket, io, ManagerOptions, SocketOptions } from "socket.io-client";

export default class SocketServiceImpl implements SocketService {
  private readonly SOCKET_ORIGIN = "http://localhost:3001";
  private _singleton: Socket | undefined = undefined;
  private options: Partial<ManagerOptions & SocketOptions> = {};
  private namespace: string = "";

  getSocket(): Socket {
    if (this._singleton == undefined) {
      this._singleton = io(`${this.SOCKET_ORIGIN}${this.namespace}`, {
        transports: ["websocket"],
        ...this.getOptions(),
      });
    }

    return this._singleton;
  }

  listen(event: string, callback: (...arg: any[]) => void) {
    this.getSocket().on(event, callback);
  }

  removeAllListener() {
    this.getSocket().removeAllListeners();
  }

  emit(event: string, ...data: any[]) {
    this.getSocket().emit(event, ...data, (...data: any[]) => {
      data.map((element) => console.log(element));
    });
  }

  disconnect() {
    this.getSocket().disconnect();
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: Partial<ManagerOptions & SocketOptions>) {
    this.options = options;
  }

  setNamespace(namespace: string) {
    this.namespace = namespace;
  }
}
