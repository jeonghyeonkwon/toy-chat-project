import React, { Component } from "react";
import styledComponent from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const LoginHeaderForm = styledComponent.div`
  background-color: dodgerblue;
  text-align:center;
  padding:20px;
  
`;
const FieldForm = styledComponent.div`
  background-color: yellowgreen;
  text-align:center;
  padding:40px;
`;
const ButtonForm = styledComponent.div`
background-color: yellowgreen;
border:1px;
border-color: #000;
text-align:center;
padding:30px;
`;
class LoginContainer extends Component {
  render() {
    return (
      <Box
        sx={{
          width: 300,
          height: 400,
          border: 1,
          borderColor: "#81c784",
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <LoginHeaderForm>로그인</LoginHeaderForm>
          </Grid>
          <Grid item xs={12} spacing={3}>
            <FieldForm>sdafsd</FieldForm>
          </Grid>
          <Grid item xs={12} spacing={3}>
            <FieldForm>sdafsd</FieldForm>
          </Grid>
          <Grid item xs={6} spacing={1}>
            <ButtonForm>로그인</ButtonForm>
          </Grid>

          <Grid item xs={6} spacing={1}>
            <ButtonForm>회원가입</ButtonForm>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default LoginContainer;
