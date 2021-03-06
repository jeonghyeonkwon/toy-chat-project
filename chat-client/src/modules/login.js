import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as userApi from "../lib/api/user";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "login/INITIALIZE";
const LOGIN_INITIALIZE = "login/LOGIN_INITIALIZE";
const CHANGE_FIELD = "login/CHANGE_FIELD";

export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("login/LOGIN");
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("login/CHECK");

export const initialize = createAction(INITIALIZE);
export const loginInitialize = createAction(LOGIN_INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const tokenCheck = createAction(CHECK, (token) => token);
const tokenCheckSaga = createRequestSaga(CHECK, userApi.tokenValidate);

export const loginUser = createAction(LOGIN, (form) => form);
const loginUserSaga = createRequestSaga(LOGIN, userApi.login);

const initialState = {
  user: {
    userId: "",
    userPassword: "",
  },
  loginApi: {
    authInfo: {
      token: null,
      userRandomId: null,
    },

    error: null,
  },
};
export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [LOGIN_INITIALIZE]: (state) =>
      produce(state, (draft) => {
        draft.user.userId = "";
        draft.user.userPassword = "";
      }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.user[key] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: success }) =>
      produce(state, (draft) => {
        draft.loginApi.authInfo.token = success.token;
        draft.loginApi.authInfo.userRandomId = success.userRandomId;
        draft.loginApi.error = null;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        if (error.response.status === 400) {
          draft.loginApi.authInfo.token = null;
          draft.loginApi.authInfo.userRandomId = null;
          draft.loginApi.error = error.response.data.msg;
        } else {
          draft.loginApi.authInfo.token = null;
          draft.loginApi.authInfo.userRandomId = null;
          draft.loginApi.error =
            "?????? ?????? ????????? ????????????. ?????? ????????? ?????????";
        }
      }),
    [CHECK_SUCCESS]: (state, { payload: success }) =>
      produce(state, (draft) => {
        draft.loginApi.authInfo.userRandomId = success.userRandomId;
      }),
    [CHECK_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.loginApi.authInfo.userRandomId = null;
        localStorage.removeItem("token");
      }),
  },
  initialState
);

export function* loginSaga() {
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(CHECK, tokenCheckSaga);
}
