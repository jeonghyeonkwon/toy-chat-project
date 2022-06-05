import React, { useState, useEffect } from "react";
import styledComponent from "styled-components";
import FooterChatContainer from "../containers/footer/FooterChatContainer";
import RoomDetailContainer from "../containers/RoomDetailContainer";
import HeaderContainer from "../containers/HeaderContainer";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SOCKET_DEFAULT_URL, CHAT_URL } from "../lib/api/socket";
import axios from "axios";
const socket = io(CHAT_URL, { path: "/socket.io" });
const RoomDetailForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;

    flex-direction column;
    justify-content: center;
    align-items: center;
`;
function RoomDetailPage(props) {
  const location = useLocation();
  const { userRandomId } = useSelector(({ login }) => ({
    userRandomId: login.loginApi.authInfo.userRandomId,
  }));

  const [messageHistory, setMessageHistory] = useState([]);

  const [message, setMessage] = useState("");
  const onChangeMessage = (e) => {
    const { value } = e.target;

    setMessage(value);
  };
  const onSendMessage = () => {
    console.log("click");
    const urlRoomId = location.pathname.split("/")[2];
    const roomInfo = {
      type: "chat",
      roomRandomId: urlRoomId,
      userRandomId: userRandomId,
      message: message,
    };
    socket.emit("createChat", roomInfo);
    setMessage("");
  };
  useEffect(() => {
    socket.on("chatInfo", (data) => {
      setMessageHistory([...messageHistory, data]);
    });
  });
  useEffect(() => {
    async function fetchChat() {
      const response = await axios.get(
        `${SOCKET_DEFAULT_URL}/api/room/${location.pathname.split("/")[2]}`
      );
      console.log(response);
      setMessageHistory(response.data);
    }
    fetchChat();
  }, []);
  return (
    <RoomDetailForm>
      <HeaderContainer title="방이름" back />
      <RoomDetailContainer
        myRandomId={userRandomId}
        messageRecord={messageHistory}
      />

      <FooterChatContainer
        onChangeMessage={onChangeMessage}
        fieldValue={message}
        onSendMessage={onSendMessage}
      />
    </RoomDetailForm>
  );
}

export default RoomDetailPage;
