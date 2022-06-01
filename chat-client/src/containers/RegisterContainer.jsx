import React from "react";
import styledComponent from "styled-components";
import { Box, Grid, Button } from "@mui/material";

import FieldComponent from "../components/FieldComponent";
const LoginHeaderForm = styledComponent.div`
  // background-color: dodgerblue;
  height:100%;
  font-weight: bold;
  font-size: 20px;
  padding:15px;
  
`;

const ButtonForm = styledComponent.div`

border:1px;
border-color: #000;
text-align:center;
padding:25px;
`;
function RegisterContainer(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        border: 1,
        borderColor: "#81c784",
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Grid container rowSpacing={1.5}>
        <Grid item xs={12}>
          <LoginHeaderForm>회원가입</LoginHeaderForm>
        </Grid>
        <Grid item xs={12} spacing={3}>
          <FieldComponent fieldTitle="아이디" fieldType="text" />
        </Grid>
        <Grid item xs={12} spacing={3}>
          <FieldComponent fieldTitle="비밀번호" fieldType="password" />
        </Grid>
        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Button size="large" variant="contained">
              로그인
            </Button>
          </ButtonForm>
        </Grid>

        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Button size="large" variant="outlined">
              회원가입
            </Button>
          </ButtonForm>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterContainer;
