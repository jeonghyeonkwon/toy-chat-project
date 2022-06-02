import client from "./client";

export const register = (form) => client.post("/user", form);

export const login = (form) => client.post("/user/login", form);

export const tokenValidate = (token) =>
  client.get("/user/validate", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  });
