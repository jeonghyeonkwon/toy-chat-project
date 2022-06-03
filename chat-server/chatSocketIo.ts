import { Server } from "socket.io";
import * as http from "http";

export const chatSocketIo = (server: http.Server) => {
  const io = new Server(server);
  io.on("connection", (socket: any) => {
    socket.on("chat message", (msg: string) => {
      io.emit("chat message", msg);
    });
  });
};
