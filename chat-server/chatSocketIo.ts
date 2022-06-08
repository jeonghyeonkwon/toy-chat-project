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
  io.on("connection", (socket: any) => {
    const req = socket.request;
    console.log("io");
    // console.log(req);
  });
  // io.on("connection", function (socket: any) {
  //   const req = socket.request;
  //   console.log(req.url);
  // });
  room.on("connection", function (socket: any) {
    const req = socket.request;
    console.log("접속 완료");
    console.log("room");
    // console.log(req.url);
    socket.on("createRoom", async (data: any) => {
      console.log(data);
      const roomDto = await createRoomChangeStatus(data);
      console.log(roomDto);
      if (roomDto !== null) {
        room.emit("roomInfo", roomDto);
      }
    });
  });
  chat.on("connection", function (socket: any) {
    console.log("------------- 챗 연결");
    console.log("chat");
    const req = socket.request;
    // console.log(req);
    socket.on("createChat", async (data: any) => {
      const chatDto = await createChatData(data);
      if (chatDto !== null) {
        chat.emit("chatInfo", chatDto);
      }
    });
    socket.on("disconection", () => {
      console.log("연결 끊김");
    });
  });
};
