import React from "react";
import styledComponent from "styled-components";

const HeaderForm = styledComponent.div`
    width:100%;
    height: 70px;
    background-color: dodgerblue;
    border-radius: 10px 10px 0 0px;
    padding:20px;
    font-size:20px;
    font-weight:bold;
    color:#fff;
`;
function HeaderContainer({ title }) {
  return <HeaderForm>{title}</HeaderForm>;
}

export default HeaderContainer;
