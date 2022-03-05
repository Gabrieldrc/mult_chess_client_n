import axios, { Axios } from "axios";

class ChessClient {
  private httpClient: Axios;
  private readonly CHESS_API_URL = "http://localhost:3001/chess/";
  constructor() {
    this.httpClient = axios;
  }
  getState(room: string) {
    return this.getHttpClient().get(`${this.CHESS_API_URL}state?room=${room}`);
  }
  private getHttpClient() {
    return this.httpClient;
  }
}
export const chessClient = new ChessClient();
