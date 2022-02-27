import { ManagerOptions, SocketOptions } from "socket.io-client";

export default interface SocketService {
  listen(event: string, callback: (...arg: any[]) => void): void;
  removeAllListener(): void;
  emit(event: string, ...data: any[]): void;
  disconnect(): void;
  getOptions(): any;
  setOptions(options: Partial<ManagerOptions & SocketOptions>): void;
  setNamespace(namespace: string): void;
}
