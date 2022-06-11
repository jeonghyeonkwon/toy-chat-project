import * as http from "http";
import {
  chatList,
  createChatData,
  createRoomChangeStatus,
  roomUpdate,
} from "./controllers/room";
import { RoomUpdateEnum } from "./enums/RoomEnum";
const SocketIO = require("socket.io");

export const chatSocketIo = (server: http.Server) => {
  const io = SocketIO(server, {
    path: "/socket.io/",
    cors: {
      origin: "*",
    },
  });
  const room = io.of("/room");
  const chat = io.of("/chat");
  room.on("connection", (socket: any) => {
    console.log("room namespace 연결");

    socket.on("createRoom", async (data: any) => {
      const roomDto = await createRoomChangeStatus(data);
      console.log(roomDto);
      if (roomDto !== null) {
        room.emit("roomInfo", roomDto);
      }
    });
  });
  chat.on("connection", async (socket: any) => {
    console.log("chat----");
    const { roomId } = socket.handshake.query;
    // console.log(roomId);
    socket.join(roomId);

    const roomResponseDto = await roomUpdate(
      RoomUpdateEnum.JOIN,
      roomId,
      chat.adapter
    );
    console.log("join");
    console.log(roomResponseDto);
    if (roomResponseDto !== null) {
      room.emit("updateRoom", roomResponseDto);
    }

    // socket.emit("initChat", await chatList(roomId));
    socket.on("createChat", async (data: any) => {
      const chatDto = await createChatData(data);
      if (chatDto !== null) {
        chat.to(roomId).emit("chatInfo", chatDto);
      }
    });

    socket.on("disconnect", async () => {
      console.log("chat namespace 연결 해제");
      console.log(roomId);
      socket.leave(roomId);
      const roomResponseDto = await roomUpdate(
        RoomUpdateEnum.EXIT,
        roomId,
        chat.adapter
      );
      console.log("exit");
      console.log(roomResponseDto);
      if (roomResponseDto !== null) {
        room.emit("updateRoom", roomResponseDto);
        setTimeout(() => room.emit("updateRoom", roomResponseDto), 2000);
      }
    });
  });

  // io.on("connection", (socket: any) => {
  //   const req = socket.request;
  //   console.log("io");
  //   // console.log(req);

  //   socket.on("joinRoom", async (data: any) => {});
  //   socket.on("exitRoom", () => {
  //     console.log("연결 끊김");
  //   });
  // });
  // io.on("connection", function (socket: any) {
  //   const req = socket.request;
  //   console.log(req.url);
  // });
};
