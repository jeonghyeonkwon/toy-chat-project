import { io } from "socket.io-client";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const ROOM_URL = `${SOCKET_DEFAULT_URL}/room`;
export const CHAT_URL = `${SOCKET_DEFAULT_URL}/chat`;
export let socket;
export const initSocketConnect = () => {
  console.log("소켓 연결...");
  socket = io(SOCKET_DEFAULT_URL, { path: "/socket.io" });
};

export const disconnectSocket = () => {
  console.log("소켓 연결 끊기...");
  if (socket) socket.disconnect();
};
