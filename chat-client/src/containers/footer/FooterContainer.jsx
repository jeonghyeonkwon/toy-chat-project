import React from "react";
import styledComponent from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const FooterContainerForm = styledComponent.div`
  width: 100%;
  height:100px;
  background-color: #fff;
  display:flex;
  flex-direction: row;
`;
const FooterButtonForm = styledComponent.div`
  width:50%;
  height:100%;
  // background-color:yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function FooterContainer({ onClickLogout }) {
  return (
    <FooterContainerForm>
      <FooterButtonForm>
        <Link to="/room-create">
          <Button size="large" variant="contained">
            방 만들기
          </Button>
        </Link>
      </FooterButtonForm>
      <FooterButtonForm>
        <Button size="large" variant="outlined" onClick={onClickLogout}>
          로그아웃
        </Button>
      </FooterButtonForm>
    </FooterContainerForm>
  );
}

export default FooterContainer;
