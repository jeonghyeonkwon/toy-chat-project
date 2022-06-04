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
function RoomDetailContainer({ myRandomId, messageRecord }) {
  return (
    <RoomDetailContainerForm>
      <BubbleFrame>
        {messageRecord.map((obj) => {
          if (obj.userRandomId === myRandomId) {
            return (
              <MySpeechBubbleComponent
                writer={obj.writerId}
                content={obj.message}
              />
            );
          } else {
            return (
              <YourSpeechBubbleComponent
                writer={obj.writerId}
                content={obj.message}
              />
            );
          }
        })}
      </BubbleFrame>
    </RoomDetailContainerForm>
  );
}

export default RoomDetailContainer;
