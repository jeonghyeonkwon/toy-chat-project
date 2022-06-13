import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_CHAT_URL = `${SOCKET_DEFAULT_URL}/chat`;

const CHAT_INFO_EVENT = "chatInfo";
const CHAT_CREATE_EVENT = "createChat";
const CHAT_INIT_EVENT = "initChat";

export const useChatSocket = (roomRandomId) => {
  const socketRef = useRef();
  const history = useHistory();
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomTitle, setRoomTitle] = useState("");
  useEffect(() => {
    socketRef.current = io(SOCKET_CHAT_URL, {
      path: "/socket.io",
      query: { roomId: roomRandomId },
    });
    socketRef.current.on(CHAT_INIT_EVENT, initChatFn);

    // }, 2000);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socketRef.current.on(CHAT_INFO_EVENT, createChatFn);
    return () => {
      socketRef.current.off(CHAT_INFO_EVENT, createChatFn);
    };
  }, [messageHistory]);
  function initChatFn(data) {
    console.log("initChatFn");
    setRoomTitle(data.roomTitle);
    setMessageHistory([...data.chatDtoList]);
  }
  function createChatFn(data) {
    setMessageHistory((message) => [...message, data]);
  }

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
