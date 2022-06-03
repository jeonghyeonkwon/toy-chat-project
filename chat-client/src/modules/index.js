import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import loading from "./loading";
import register, { registerSaga } from "./register";
import login, { loginSaga } from "./login";
import room, { roomSaga } from "./room";
const rootReducer = combineReducers({ loading, register, login, room });

export function* rootSaga() {
  yield all([registerSaga(), loginSaga(), roomSaga()]);
}
export default rootReducer;
