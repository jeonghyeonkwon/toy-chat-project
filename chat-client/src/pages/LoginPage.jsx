import React, { Component } from "react";
import LoginContainer from "../containers/LoginContainer";
import styledComponent from "styled-components";

const LoginContainerForm = styledComponent.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
class LoginPage extends Component {
  render() {
    return (
      <>
        <LoginContainerForm>
          <LoginContainer />
        </LoginContainerForm>
      </>
    );
  }
}

export default LoginPage;
