import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_CHAT_URL = `${SOCKET_DEFAULT_URL}/chat`;
const CHAT_INFO_EVENT = "chatInfo";
const CHAT_CREATE_EVENT = "createChat";
const CHAT_INIT_EVENT = "initChat";
export const useChatSocket = (roomRandomId) => {
  const socketRef = useRef();
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomTitle, setRoomTitle] = useState("");
  useEffect(() => {
    // async function fetchChat() {
    //   const response = await axios.get(
    //     `${SOCKET_DEFAULT_URL}/api/room/${roomRandomId}`
    //   );

    //   setRoomTitle(response.data.roomTitle);
    //   setMessageHistory(response.data.chatDtoList);
    // }
    // fetchChat();
    socketRef.current = io(SOCKET_CHAT_URL, {
      path: "/socket.io",
      query: { roomId: roomRandomId },
    });
    socketRef.current.on(CHAT_INIT_EVENT, (data) => {
      console.log("init");
      console.log(data);
      setRoomTitle(data.roomTitle);
      console.log(data.chatDtoList);
      setMessageHistory((message) => [...message, ...data.chatDtoList]);
      console.log(messageHistory);
    });
    socketRef.current.on(CHAT_INFO_EVENT, (data) => {
      console.log("data");
      console.log(data);
      console.log("before ");
      console.log(messageHistory);
      setMessageHistory((message) => [...message, data]);
      console.log("after message ");
      console.log(messageHistory);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomRandomId]);

  useEffect(() => {}, [messageHistory]);
  const sendCreateChat = (roomRandomId, userRandomId, message) => {
    const chatInfo = {
      type: "chat",
      roomRandomId: roomRandomId,
      userRandomId: userRandomId,
      message: message,
    };
    socketRef.current.emit(CHAT_CREATE_EVENT, chatInfo);
  };
  return { roomTitle, messageHistory, sendCreateChat };
};
