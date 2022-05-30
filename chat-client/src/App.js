import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import styledComponent from "styled-components";
import LoginOrRegisterPage from "./pages/LoginOrRegisterPage";
import RoomListPage from "./pages/RoomListPage";
const AppForm = styledComponent.div`
  width: 100%;
  height:100vh;
  background-color: #ddd;
`;

function App(props) {
  return (
    <>
      <AppForm>
        <Route path={["/", "/login"]} exact component={LoginOrRegisterPage} />
        <Route path="/room" exact component={RoomListPage} />
      </AppForm>
    </>
  );
}

export default App;
