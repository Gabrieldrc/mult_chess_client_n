/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export const factory = (
  endpoint: string,
  options: Partial<ManagerOptions & SocketOptions> = {}
) => {
  return io(endpoint, {
    transports: ["websocket"],
    ...options,
  });
};

export const listen = (
  socket: Socket,
  event: string,
  callback: (...arg: any[]) => void
) => {
  socket.on(event, callback);
};

export const removeAllListener = (socket: Socket) => {
  socket.removeAllListeners();
};

export const emit = (socket: Socket, event: string, ...data: any[]) => {
  socket.emit(event, ...data);
};

export const disconnect = (socket: Socket) => {
  socket.disconnect();
};

export const removeListener = (socket: Socket, listener: string): void => {
  socket.removeListener(listener);
};

export const removeListeners = (socket: Socket, listeners: string[]): void => {
  listeners.map((listener) => socket.removeListener(listener));
};
