import React from "react";
import styledComponent from "styled-components";
const SpeechBubbleForm = styledComponent.div`
  // background-color:dodgerblue;
  padding-top:20px;
  padding-left:20px;
  span{
    // background-color:crimson;
    display:block;
    text-align: right;
    font-weight:bold;
    padding-right: 15px; 
  }
`;
const SpeechBubbleFrame = styledComponent.div`
    
    position:relative;
    
`;
const BubbleBody = styledComponent.div`
    background-color: yellow;    
    padding:10px;
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
function MySpeechBubbleComponent({ writer, content }) {
  return (
    <SpeechBubbleForm>
      <span>{writer}</span>
      <SpeechBubbleFrame>
        <BubbleBody>{content}</BubbleBody>
        <Tail></Tail>
      </SpeechBubbleFrame>
    </SpeechBubbleForm>
  );
}

export default MySpeechBubbleComponent;
