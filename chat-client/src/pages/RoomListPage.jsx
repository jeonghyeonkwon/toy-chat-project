import React from "react";
import styledComponent from "styled-components";
import FooterContainer from "../containers/footer/FooterContainer";
import HeaderContainer from "../containers/HeaderContainer";
import RoomListContainer from "../containers/RoomListContainer";

const RoomListForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;
    
    flex-direction column;
    justify-content: center;
    align-items: center;
`;
function RoomList(props) {
  return (
    <RoomListForm>
      <HeaderContainer title="방 리스트" />
      <RoomListContainer />
      <FooterContainer />
    </RoomListForm>
  );
}

export default RoomList;
