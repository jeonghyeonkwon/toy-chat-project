import * as WebSocket from "ws";
import * as http from "http";
import { Request } from "express";
import { createChatData } from "./controllers/room";
export const chatWebSocket = (server: http.Server) => {
  console.log(server);

  const wss = new WebSocket.Server({ server });
  // const roomWss = new WebSocket.Server({ noServer: true });
  // const chatWss = new WebSocket.Server({ noServer: true });
  // server.on("upgrade", (req, socket, head) => {
  //   chatWss.handleUpgrade(req, socket, (head) => {
  //     chatWss.emit("connection", socket, req);
  //   });
  // });
  wss.on("connection", (ws: WebSocket, req: Request) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(`새로운 클라이언트 접속 ${ip}`);
    ws.on("message", async (message: string) => {
      // const obj = JSON.parse(message);
      const chatObject = JSON.parse(message.toString());

      const result = await createChatData(chatObject);

      console.log(req.url);

      wss.clients.forEach(function (client) {
        console.log("==============");
        // console.log(client);
        console.log(`client.url ${client.url}`);

        console.log("==============");
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(result));
        }
      });
    });

    ws.on("error", (err) => {
      console.error(err);
    });
    ws.on("close", () => {
      console.log(`클라이언트 접속 해제 ${ip}`);
    });
  });
};
