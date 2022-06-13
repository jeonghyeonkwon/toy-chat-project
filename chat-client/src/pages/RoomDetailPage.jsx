import React, { useState, useEffect } from "react";
import styledComponent from "styled-components";
import FooterChatContainer from "../containers/footer/FooterChatContainer";
import RoomDetailContainer from "../containers/RoomDetailContainer";
import HeaderContainer from "../containers/HeaderContainer";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChatSocket } from "../lib/socket/chatSocket";

const RoomDetailForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;

    flex-direction column;
    justify-content: center;
    align-items: center;
`;

function RoomDetailPage() {
  const location = useLocation();
  const { userRandomId } = useSelector(({ login }) => ({
    userRandomId: login.loginApi.authInfo.userRandomId,
  }));
  // const [roomTitle, setRoomTitle] = useState("");
  // const [messageHistory, setMessageHistory] = useState([]);
  const { roomTitle, messageHistory, sendCreateChat } = useChatSocket(
    location.pathname.split("/")[2]
  );
  const [message, setMessage] = useState("");
  const onChangeMessage = (e) => {
    const { value } = e.target;

    setMessage(value);
  };

  const onSendMessage = () => {
    console.log("click");
    const urlRoomId = location.pathname.split("/")[2];
    sendCreateChat(urlRoomId, userRandomId, message);

    setMessage("");
  };
  // https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

  return (
    <RoomDetailForm>
      <HeaderContainer title={roomTitle} back />
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
