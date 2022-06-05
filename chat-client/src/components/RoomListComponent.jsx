import React from "react";
import styledComponent from "styled-components";

const RoomListForm = styledComponent.div`
    
    width: 100%;
    height:70px;
    border: 1px solid gray;
    // background-color: dodgerblue;
    border-radius: 6px;
    overflow:hidden;
    padding:5px;
    margin-bottom:5px;
`;
const RoomTitleFrom = styledComponent.div`
    height: 65%;
    width: 100%;
    
    padding:10px;
    span {
        font-weight: bold;
        font-size: 20px;
        
        display:inline-block;
    }
  
`;
const HeadCountForm = styledComponent.div`
    text-align: right;
    width: 100%;
    height:35%;
    
    padding:2px;
    span{
      color : dodgerblue;
    }
`;
function RoomListComponent({ roomInfo }) {
  return (
    <RoomListForm>
      <RoomTitleFrom>
        <label>방 이름 : </label>
        <span>{roomInfo.roomTitle}</span>
      </RoomTitleFrom>
      <HeadCountForm>
        <label>총 인원 : </label>
        <span>{roomInfo.totalPerson}명</span>
      </HeadCountForm>
    </RoomListForm>
  );
}

export default RoomListComponent;
