import { Socket, io } from 'socket.io-client'
const SOCKET_URI = 'http://localhost:3000'
export default class SocketService {
  static _singleton: Socket
  static getSocket(): Socket {
    if (this._singleton == undefined) {
      this._singleton = io(SOCKET_URI);
    }
    return this._singleton
  }
  static listen(event: string, callback: ()=>void) {
    this.getSocket().on(event, callback)
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