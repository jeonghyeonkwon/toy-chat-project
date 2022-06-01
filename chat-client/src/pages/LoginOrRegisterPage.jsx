import React, { Component } from "react";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import styledComponent from "styled-components";

const LoginOrRegisterContainerForm = styledComponent.div`
width: 400px;
height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function LoginOrRegisterPage(props) {
  return (
    <>
      <LoginOrRegisterContainerForm>
        <RegisterContainer />
      </LoginOrRegisterContainerForm>
    </>
  );
}

export default LoginOrRegisterPage;
