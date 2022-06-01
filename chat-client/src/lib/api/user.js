import client from "./client";

export const register = (form) => client.post("/register", form);
