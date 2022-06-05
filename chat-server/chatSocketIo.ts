import * as http from "http";
import { createChatData, createRoomChangeStatus } from "./controllers/room";
const SocketIO = require("socket.io");

export const chatSocketIo = (server: http.Server) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
    },
  });
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket: any) => {
    const req = socket.request;
    console.log("접속 완료");

    socket.on("createRoom", async (data: any) => {
      console.log(data);
      const roomDto = await createRoomChangeStatus(data);
      if (roomDto !== null) {
        room.emit("roomInfo", roomDto);
      }
    });
  });
  chat.on("connection", (socket: any) => {
    const req = socket.request;
    socket.on("createChat", async (data: any) => {
      const chatDto = await createChatData(data);
      if (chatDto !== null) {
        chat.emit("chatInfo", chatDto);
      }
    });
  });
};
