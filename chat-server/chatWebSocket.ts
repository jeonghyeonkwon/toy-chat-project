import * as WebSocket from "ws";
import * as http from "http";
import { Request } from "express";
export const chatWebSocket = (server: http.Server) => {
  console.log(server);
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws: WebSocket, req: Request) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(`새로운 클라이언트 접속 ${ip}`);
    ws.on("message", (message: string) => {
      // const obj = JSON.parse(message);
      console.log(JSON.parse(message.toString()));
    });
    ws.on("error", (err) => {
      console.error(err);
    });
    ws.on("close", () => {
      console.log(`클라이언트 접속 해제 ${ip}`);
    });
  });
};
