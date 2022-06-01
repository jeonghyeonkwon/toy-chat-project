import React from "react";
import styledComponent from "styled-components";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const FooterChatContainerForm = styledComponent.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
//   padding:5px;
`;

const InputFieldForm = styledComponent.div`
    height:100%;
    width:75%;
    // background-color: gray;
    display: flex;
    align-items: center;
    padding:5px;
`;
const SubmitForm = styledComponent.div`
    height:100%;
    width:25%;
    display: flex;
    align-items: center;
    padding:2px;
    // background-color:yellow;
`;
function FooterChatContainer(props) {
  return (
    <FooterChatContainerForm>
      <InputFieldForm>
        <TextField
          hiddenLabel
          placeholder="내용을 입력하세요"
          variant="filled"
          fullWidth
        />
      </InputFieldForm>
      <SubmitForm>
        <Button
          fullWidth
          style={{
            height: "90%",
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          보내기
        </Button>
      </SubmitForm>
    </FooterChatContainerForm>
  );
}

export default FooterChatContainer;
