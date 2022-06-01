import React, { Component } from "react";

import LoginContainer from "../containers/LoginContainer";
import styledComponent from "styled-components";

const LoginContainerForm = styledComponent.div`
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function LoginPage(props) {
  return (
    <>
      <LoginContainerForm>
        <LoginContainer />
      </LoginContainerForm>
    </>
  );
}

export default LoginPage;
