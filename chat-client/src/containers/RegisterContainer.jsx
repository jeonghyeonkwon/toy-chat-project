import React, { useCallback, useEffect } from "react";
import styledComponent from "styled-components";
import { Box, Grid, Button } from "@mui/material";

import FieldComponent from "../components/FieldComponent";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initialize,
  registerUser,
  REGISTER,
} from "../modules/register";

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
function RegisterContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userForm, registerLoading, registerSuccess, registerError } =
    useSelector(({ register, loading }) => ({
      userForm: register.user,
      registerLoading: loading[REGISTER],
      registerSuccess: register.registerApi.success,
      registerError: register.registerApi.error,
    }));
  const onChangeField = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ key: name, value }));
  };
  const onClickRegister = () => {
    dispatch(registerUser(userForm));
  };
  useEffect(() => {
    dispatch(initialize());
    return () => {
      dispatch(initialize());
    };
  }, []);
  useEffect(() => {
    if (registerSuccess) {
      alert("회원 가입에 완료했습니다!");
      history.push("/login");
    }
    if (registerError) {
      alert(registerError);
      history.push("/register");
    }
  }, [registerSuccess, registerError]);

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
            <Button size="large" variant="contained" onClick={onClickRegister}>
              가입 완료
            </Button>
          </ButtonForm>
        </Grid>

        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Link to="login">
              <Button size="large" variant="outlined">
                로그인
              </Button>
            </Link>
          </ButtonForm>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterContainer;
