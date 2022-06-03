import React from "react";
import styledComponent from "styled-components";
import MySpeechBubbleComponent from "../components/MySpeechBubbleComponent";
import YourSpeechBubbleComponent from "../components/YourSpeechBubbleComponent";

const RoomDetailContainerForm = styledComponent.div`
    height:100%;
    width:100%;
    background-color: #fff;
`;
const BubbleFrame = styledComponent.div`
    padding:10px;
    & > div{
        margin-bottom:10px;
    }
`;
function RoomDetailContainer(props) {
  return (
    <RoomDetailContainerForm>
      <BubbleFrame>
        <MySpeechBubbleComponent content="dsfasdfd" />
        <YourSpeechBubbleComponent content="asdfasdfsda" />
      </BubbleFrame>
    </RoomDetailContainerForm>
  );
}

export default RoomDetailContainer;
