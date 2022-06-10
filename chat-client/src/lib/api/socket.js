import { io } from "socket.io-client";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_ROOM_URL = `${SOCKET_DEFAULT_URL}/room`;
export const SOCKET_CHAT_URL = `${SOCKET_DEFAULT_URL}/chat`;
export let roomSocket;

export const initSocketRoomConnect = () => {
  console.log("소켓 연결...");
  roomSocket = io(SOCKET_ROOM_URL, { path: "/socket.io" });
  return roomSocket;
};

export const disconnectRoomSocket = () => {
  console.log("소켓 연결 끊기...");
  if (roomSocket) roomSocket.disconnect();
};

export const scribeToRoom = () => {};
