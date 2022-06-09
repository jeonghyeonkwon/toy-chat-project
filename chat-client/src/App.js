import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import styledComponent from "styled-components";
import LoginPage from "./pages/LoginPage";
import RoomListPage from "./pages/RoomListPage";
import RoomCreatePage from "./pages/RoomCreatePage";

import RegisterPage from "./pages/RegisterPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import { initSocketConnect, disconnectSocket } from "./lib/api/socket";
import Auth from "./hoc/auth";
const AppForm = styledComponent.div`
  width: 100%;
  height:100vh;
  background-color: #ddd;
  display:flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  useEffect(() => {
    initSocketConnect();
    return () => {
      disconnectSocket();
    };
  }, []);
  return (
    <>
      <AppForm>
        <Route
          path={["/", "/login"]}
          exact
          component={Auth(LoginPage, false)}
        />
        <Route path="/register" exact component={Auth(RegisterPage, false)} />
        <Route path="/room" exact component={Auth(RoomListPage, true)} />
        <Route path="/room/:id" component={Auth(RoomDetailPage, true)} />
        <Route
          path="/room-create"
          exact
          component={Auth(RoomCreatePage, true)}
        />
      </AppForm>
    </>
  );
}

export default App;
