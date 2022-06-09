import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styledComponent from "styled-components";
import FooterContainer from "../containers/footer/FooterContainer";
import HeaderContainer from "../containers/HeaderContainer";
import RoomListContainer from "../containers/RoomListContainer";

const RoomListForm = styledComponent.div`
    width: 400px;
    height: 70%;
    display: flex;
    
    flex-direction column;
    justify-content: center;
    align-items: center;
`;
function RoomList() {
  const history = useHistory();
  const onClickLogout = (e) => {
    try {
      localStorage.removeItem("token");
      alert("로그아웃이 완료되었습니다");
      history.push("/");
    } catch (e) {}
  };
  return (
    <RoomListForm>
      <HeaderContainer title="방 리스트" />
      <RoomListContainer />
      <FooterContainer onClickLogout={onClickLogout} />
    </RoomListForm>
  );
}

export default RoomList;
