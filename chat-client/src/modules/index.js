import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import loading from "./loading";
import register, { registerSaga } from "./register";
const rootReducer = combineReducers({ loading, register });

export function* rootSaga() {
  yield all([registerSaga()]);
}
export default rootReducer;
