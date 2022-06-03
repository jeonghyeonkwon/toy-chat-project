import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as userApi from "../lib/api/user";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "register/INITIALIZE";
const CHANGE_FIELD = "register/CHANGE_FIELD";

export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("register/REGISTER");

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const registerUser = createAction(REGISTER, (form) => form);
const registerUserSaga = createRequestSaga(REGISTER, userApi.register);

const initialState = {
  user: {
    userId: "",
    userPassword: "",
  },
  registerApi: {
    success: null,
    error: null,
  },
};
export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.user[key] = value;
      }),
    [REGISTER_SUCCESS]: (state, { payload: success }) =>
      produce(state, (draft) => {
        draft.registerApi.success = true;
        draft.registerApi.error = null;
      }),
    [REGISTER_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        if (error.response.status === 400) {
          draft.registerApi.success = null;
          draft.registerApi.error = error.response.data.msg;
        } else {
          draft.registerApi.success = null;
          draft.registerApi.error =
            "알 수 없는 에러가 있습니다. 다시 시도해 주세요";
        }
      }),
  },
  initialState
);

export function* registerSaga() {
  yield takeLatest(REGISTER, registerUserSaga);
}
