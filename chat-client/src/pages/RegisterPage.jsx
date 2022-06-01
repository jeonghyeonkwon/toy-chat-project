import React from "react";

import RegisterContainer from "../containers/RegisterContainer";
import styledComponent from "styled-components";

const RegisterContainerForm = styledComponent.div`
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function RegisterPage(props) {
  return (
    <>
      <RegisterContainerForm>
        <RegisterContainer />
      </RegisterContainerForm>
    </>
  );
}

export default RegisterPage;
