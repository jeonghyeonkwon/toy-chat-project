import React from "react";
import styledComponent from "styled-components";
import RoomListContainer from "../containers/RoomListContainer";

const RoomListContainerForm = styledComponent.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
function RoomList(props) {
  return (
    <RoomListContainerForm>
      <RoomListContainer />
    </RoomListContainerForm>
  );
}

export default RoomList;
