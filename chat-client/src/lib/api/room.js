import client from "./client";

export const createRoom = (form) => client.post("/room", form);
