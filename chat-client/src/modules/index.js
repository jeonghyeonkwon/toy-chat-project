import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import loading from "./loading";
import register, { registerSaga } from "./register";
import login, { loginSaga } from "./login";
const rootReducer = combineReducers({ loading, register, login });

export function* rootSaga() {
  yield all([registerSaga(), loginSaga()]);
}
export default rootReducer;
