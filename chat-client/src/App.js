import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import styledComponent from "styled-components";
import LoginPage from "./pages/LoginPage";
import RoomListPage from "./pages/RoomListPage";
import RoomCreatePage from "./pages/RoomCreatePage";

import RegisterPage from "./pages/RegisterPage";
import RoomDetailPage from "./pages/RoomDetailPage";
const AppForm = styledComponent.div`
  width: 100%;
  height:100vh;
  background-color: #ddd;
  display:flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <>
      <AppForm>
        <Route path={["/", "/login"]} exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/room" exact component={RoomListPage} />
        <Route path="/room/:id" component={RoomDetailPage} />
        <Route path="/room-create" exact component={RoomCreatePage} />
      </AppForm>
    </>
  );
}

export default App;
