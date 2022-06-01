import React from "react";
import styledComponent from "styled-components";
import FooterChatContainer from "../containers/footer/FooterChatContainer";
import RoomDetailContainer from "../containers/RoomDetailContainer";
import HeaderContainer from "../containers/HeaderContainer";
const RoomDetailForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;
    background-color: yellowgreen;
    flex-direction column;
    justify-content: center;
    align-items: center;
`;
function RoomDetailPage(props) {
  return (
    <RoomDetailForm>
      <HeaderContainer title="방이름" />
      <RoomDetailContainer />
      <FooterChatContainer />
    </RoomDetailForm>
  );
}

export default RoomDetailPage;
