import React from "react";
import styledComponent from "styled-components";
import FooterContainer from "../containers/FooterContainer";
import RoomListContainer from "../containers/RoomListContainer";

const RoomListContainerForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;
    
    flex-direction column;
    justify-content: center;
    align-items: center;
`;
function RoomList(props) {
  return (
    <RoomListContainerForm>
      <RoomListContainer />
      <FooterContainer />
    </RoomListContainerForm>
  );
}

export default RoomList;
