import { Socket, io } from 'socket.io-client'
const SOCKET_URI = 'http://localhost:3001'
export default class SocketService {
  static _singleton: Socket | undefined = undefined
  static getSocket(option: any = {}): Socket {
    if (this._singleton == undefined) {
      this._singleton = io(SOCKET_URI, {transports: ['websocket'], ...option});
    }
    return this._singleton
  }
  static listen(event: string, callback: (...arg: any[])=>void) {
    this.getSocket().on(event, callback)
  }
  static removeAllListener() {
    this.getSocket().removeAllListeners()
  }
  static emit(event: string, ...data: any[]) {
    this.getSocket().emit(event, ...data, (...data: any[])=>{
      data.map(element=> console.log(element))
    })
  }
  static disconnect() {
    this.getSocket().disconnect()
  }
}