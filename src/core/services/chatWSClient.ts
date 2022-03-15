/* eslint-disable @typescript-eslint/no-explicit-any */
import IMessage from "@interfaces/IMessage";
import { Socket } from "socket.io-client";
import { endpointsSocket } from "@services/endpoints";
import * as socketHelper from "core/helpers/socket";

let chatSocket: Socket;

const initiateSocket = () => {
  chatSocket = socketHelper.factory(endpointsSocket.service.chat);
  return chatSocket;
};

const getSocket = () => (chatSocket ? chatSocket : initiateSocket());

export const connectHandler = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "connect", callback);
};

export const newMessageHandler = (callback: (...arg: any[]) => void): void => {
  socketHelper.listen(getSocket(), "message", callback);
};

//---emitters
export const sendMessage = (room: string, message: IMessage): void => {
  socketHelper.emit(getSocket(), "message", room, message);
};

export const joinChatRoom = (room: string): void => {
  socketHelper.emit(getSocket(), "joinRoom", room);
};

export const removeAllListener = (): void => {
  socketHelper.removeAllListener(getSocket());
};

export const removeNewMessageHandler = (): void => {
  socketHelper.removeListener(getSocket(), "message");
};

export const disconnect = (): void => {
  socketHelper.disconnect(getSocket());
};