import axios from "axios";
const client = axios.create();

client.defaults.baseURL = "http://localhost:8000/api";

export function loadToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    return {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    };
  } catch (e) {
    console.log("localStorage가 작동하지 않습니다.");
    return;
  }
}
export default client;
