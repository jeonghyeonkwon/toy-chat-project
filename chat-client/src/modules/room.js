import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as roomApi from "../lib/api/room";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "room/INITIALIZE";
const CHANGE_FIELD = "room/CHANGE_FIELD";

export const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] =
  createRequestActionTypes("room/CREATE");

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const createRoom = createAction(CREATE, (form) => form);
const createRoomSaga = createRequestSaga(CREATE, roomApi.createRoom);
const initialState = {
  roomForm: {
    roomTitle: "",
  },
  roomApi: {
    success: null,
    error: null,
  },
};

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.roomForm[key] = value;
      }),
    [CREATE_SUCCESS]: (state, { payload: success }) =>
      produce(state, (draft) => {
        console.log(success);
        draft.roomApi.success = success.id;
        draft.roomApi.error = null;
      }),
    [CREATE_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        if ((error.response.status = 400)) {
          draft.roomApi.success = null;
          draft.roomApi.error = error.response.data.msg;
        } else {
          draft.roomApi.success = null;
          draft.roomApi.error =
            "알 수 없는 에러가 있습니다. 다시 시도해 주세요";
        }
      }),
  },
  initialState
);

export function* roomSaga() {
  yield takeLatest(CREATE, createRoomSaga);
}
