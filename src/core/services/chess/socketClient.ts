/* eslint-disable @typescript-eslint/no-explicit-any */
import { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { endpointsSocket } from "@services/endpoints";
import * as socketHelper from "core/helpers/socket";
import IPosition from "@interfaces/Position.interface";

let chessSocket: Socket;

export enum event {
  CONNECT = "connect",
  NEW_GAME = "newGame",
  UPDATE = "gameStateUpdate",
  ERROR = "error",
  JOIN_GAME = "joinGame",
  PLAY = "play",
}

const initiateSocket = (options?: Partial<ManagerOptions & SocketOptions>) => {
  chessSocket = socketHelper.factory(endpointsSocket.games.chess, options);
  return chessSocket;
};

const getSocket = (options?: Partial<ManagerOptions & SocketOptions>) =>
  chessSocket ? chessSocket : initiateSocket(options);

//---listeners
export const connectListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "connect", callback);
};

export const connectWithTokenListener = (
  token: string,
  callback: (...arg: any[]) => void
): void => {
  socketHelper.listen(
    getSocket({ auth: { player_token: `Bearer ${token}` } }),
    "connect",
    callback
  );
};

export const gameUpdateListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "gameStateUpdate", callback);
};

export const ErrorListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "error", callback);
};

//---emmitters
export const joinGame = (room: string): void => {
  socketHelper.emit(getSocket(), "joinGame", room);
};

export const play = (from: IPosition, to: IPosition): void => {
  socketHelper.emit(getSocket(), "play", from, to);
};

export const removeAllListener = (): void => {
  socketHelper.removeAllListener(getSocket());
};

export const removeListeners = (listeners: string[]): void => {
  socketHelper.removeListeners(getSocket(), listeners);
};

export const emit = (event: string, ...data: any[]): void => {
  socketHelper.emit(getSocket(), event, data);
};

export const disconnect = (): void => {
  socketHelper.disconnect(getSocket());
};
