/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io-client";
import { endpointsSocket } from "@services/endpoints";
import * as socketHelper from "core/helpers/socket";
import IPosition from "@interfaces/Position.interface";

let chessSocket: Socket;

const initiateSocket = () => {
  chessSocket = socketHelper.factory(endpointsSocket.games.chess);
  return chessSocket;
};

const getSocket = () => (chessSocket ? chessSocket : initiateSocket());

//---listeners
export const connectListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "connect", callback);
};

export const newGameListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "newGame", callback);
};

export const gameStateUpdateListener = (
  callback: (...arg: any[]) => void
): void => {
  socketHelper.listen(getSocket(), "gameStateUpdate", callback);
};

export const ErrorListener = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "error", callback);
};

//---emmitters
export const emitNewGame = (): void => {
  socketHelper.emit(getSocket(), "newGame");
};

export const emitJoinGame = (room: string): void => {
  socketHelper.emit(getSocket(), "joinGame", room);
};

export const emitPlay = (from: IPosition, to: IPosition): void => {
  socketHelper.emit(getSocket(), "play", from, to);
};

export const removeAllListener = (): void => {
  socketHelper.removeAllListener(getSocket());
};

export const emit = (event: string, ...data: any[]): void => {
  socketHelper.emit(getSocket(), event, data);
};

export const disconnect = (): void => {
  socketHelper.disconnect(getSocket());
};
