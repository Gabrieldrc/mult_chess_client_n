const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const endpointsAPI = {
  chess: {
    getState: (room: string) => `${API_URL}chess/state?room=${room}`,
  },
};

export const endpointsSocket = {
  games: {
    chess: `${SOCKET_URL}game/chess/`,
  },
  service: {
    chat: `${SOCKET_URL}service/chat/`,
  },
};
