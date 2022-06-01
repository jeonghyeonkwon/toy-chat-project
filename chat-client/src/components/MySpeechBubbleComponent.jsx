import React from "react";
import styledComponent from "styled-components";
const SpeechBubbleFrame = styledComponent.div`
    // background-color:dodgerblue;
    position:relative;
`;
const BubbleBody = styledComponent.div`
    background-color: yellow;    
    padding:20px;
    border: 3px solid gray;
    border-radius: 10px;
`;
const Tail = styledComponent.div`
background-color: yellow;
border-top: 3px solid gray;
border-right: 3px solid gray;
width:10px;
height:10px;
position:absolute;
right:0%;
top:50%;
z-index:9999;

transform :  translate(50%,-50%) rotate(45deg);
`;
function MySpeechBubbleComponent({ content }) {
  return (
    <SpeechBubbleFrame>
      <BubbleBody>{content}</BubbleBody>
      <Tail></Tail>
    </SpeechBubbleFrame>
  );
}

export default MySpeechBubbleComponent;
