import client from "./client";

export const register = (form) => client.post("/user", form);
