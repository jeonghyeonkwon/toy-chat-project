import React from "react";
import styledComponent from "styled-components";
const SpeechBubbleFrame = styledComponent.div`
    // background-color:dodgerblue;
    position:relative;
    
`;
const BubbleBody = styledComponent.div`
    background-color: #eee;    
    padding:10px;
    border: 3px solid gray;
    border-radius: 10px;
`;
const Tail = styledComponent.div`
background-color: #eee;
border-left: 3px solid gray;
border-bottom: 3px solid gray;
width:10px;
height:10px;
position:absolute;
left:0%;
top:50%;
z-index:9999;

transform :  translate(-50%,-50%) rotate(45deg);
`;
function YourSpeechBubbleComponent({ content }) {
  return (
    <SpeechBubbleFrame>
      <BubbleBody>{content}</BubbleBody>
      <Tail></Tail>
    </SpeechBubbleFrame>
  );
}

export default YourSpeechBubbleComponent;
