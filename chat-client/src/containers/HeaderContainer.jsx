import React from "react";
import styledComponent from "styled-components";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import { Link } from "react-router-dom";
const HeaderForm = styledComponent.div`
    width:100%;
    height: 70px;
    background-color: dodgerblue;
    border-radius: 10px 10px 0 0px;
    padding:20px;
    font-size:20px;
    font-weight:bold;
    color:#fff;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const HeaderTitle = styledComponent.div`
  width:80%;

`;
const HeaderBack = styledComponent.div`
width:20%;

display:flex;
justify-content: right;
align-items: center;


`;
function HeaderContainer({ title, back }) {
  return (
    <HeaderForm>
      <HeaderTitle>{title}</HeaderTitle>
      {back && (
        <HeaderBack>
          <Link to="/room">
            <KeyboardReturnRoundedIcon />
          </Link>
        </HeaderBack>
      )}
    </HeaderForm>
  );
}

export default HeaderContainer;
