import React, { useEffect } from "react";
import styledComponent from "styled-components";
import { Box, Grid, Button } from "@mui/material";

import FieldComponent from "../components/FieldComponent";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initialize, loginUser, LOGIN } from "../modules/login";
const LoginHeaderForm = styledComponent.div`
  // background-color: dodgerblue;
  height:100%;
  font-weight: bold;
  font-size: 20px;
  padding:15px;
  
`;

const ButtonForm = styledComponent.div`
// background-color: yellowgreen;
border:1px;
border-color: #000;
text-align:center;
padding:25px;
`;

function LoginContainer(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userForm, loginLoading, token, userRandomId, loginError } =
    useSelector(({ login, loading }) => ({
      userForm: login.user,
      loginLoading: loading[LOGIN],
      token: login.loginApi.authInfo.token,
      userRandomId: login.loginApi.authInfo.userRandomId,
      loginError: login.loginApi.error,
    }));
  const onChangeField = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ key: name, value }));
  };
  const onClickLogin = () => {
    dispatch(loginUser(userForm));
  };
  useEffect(() => {
    if (token) {
      console.log(token);
      try {
        localStorage.setItem("token", `Bearer ${token}`);
        history.push("/room");
      } catch (err) {
        alert("알수 없는 오류가 발생했습니다. 다시 시도해 주세요");
        history.push("/login");
      }
    }
    if (loginError) {
      alert(loginError);
      history.push("/login");
    }
  }, [token, loginError]);
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
          <LoginHeaderForm>로그인</LoginHeaderForm>
        </Grid>
        <Grid item xs={12} spacing={3}>
          <FieldComponent
            fieldTitle="아이디"
            fieldType="text"
            fieldName="userId"
            fieldValue={userForm.userId}
            onChangeField={onChangeField}
          />
        </Grid>
        <Grid item xs={12} spacing={3}>
          <FieldComponent
            fieldTitle="비밀번호"
            fieldType="password"
            fieldName="userPassword"
            fieldValue={userForm.userPassword}
            onChangeField={onChangeField}
          />
        </Grid>
        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Button size="large" variant="contained" onClick={onClickLogin}>
              로그인 하기
            </Button>
          </ButtonForm>
        </Grid>

        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Link to="register">
              <Button size="large" variant="outlined">
                회원가입
              </Button>
            </Link>
          </ButtonForm>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginContainer;
