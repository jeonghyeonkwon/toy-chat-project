import React, { useState, useEffect } from "react";
import styledComponent from "styled-components";
import FooterChatContainer from "../containers/footer/FooterChatContainer";
import RoomDetailContainer from "../containers/RoomDetailContainer";
import HeaderContainer from "../containers/HeaderContainer";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:8000");
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [message, setMessage] = useState("");
  const onChangeMessage = (e) => {
    const { value } = e.target;

    setMessage(value);
  };
  const onSendMessage = () => {
    const urlRoomId = location.pathname.split("/")[2];
    const roomInfo = {
      type: "chat",
      roomRandomId: urlRoomId,
      userRandomId: userRandomId,
      message: message,
    };
    sendMessage(JSON.stringify(roomInfo));
    setMessage("");
  };
  useEffect(() => {
    if (lastMessage !== null) {
      const obj = JSON.parse(lastMessage.data);
      console.log(obj);
      setMessageHistory([...messageHistory, obj]);
      console.log(messageHistory);
    }
  }, [lastMessage, setMessageHistory]);
  useEffect(() => {}, []);
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
