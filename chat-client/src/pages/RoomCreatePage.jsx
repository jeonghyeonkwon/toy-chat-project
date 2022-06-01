import React from "react";
import styledComponent from "styled-components";
import RoomCreateContainer from "../containers/RoomCreateContainer";
const RoomCreateForm = styledComponent.div`
    width: 400px;
    height: 70%
    display: flex;
    justify-content: center;
    align-items: center;
`;
function RoomCreatePage(props) {
  return (
    <RoomCreateForm>
      <RoomCreateContainer />
    </RoomCreateForm>
  );
}

export default RoomCreatePage;
