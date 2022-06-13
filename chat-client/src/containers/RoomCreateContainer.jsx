import React, { useEffect } from "react";
import styledComponent from "styled-components";
import { Box, Grid, Button } from "@mui/material";
import FieldComponent from "../components/FieldComponent";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialize, changeField, CREATE, createRoom } from "../modules/room";
import { useCreateRoomSocket } from "../lib/socket/roomSocket";

const RoomCreateHeaderForm = styledComponent.div`
  // background-color: dodgerblue;
  height:100%;
  font-weight: bold;
  font-size: 20px;
  padding:15px;
`;

const ButtonForm = styledComponent.div`

border:1px;
border-color: #000;
text-align:center;
padding:25px;
`;

function RoomCreateContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { roomForm, createLoading, createSuccess, createFail } = useSelector(
    ({ room, loading }) => ({
      roomForm: room.roomForm,
      createLoading: loading[CREATE],
      createSuccess: room.roomApi.success,
      createFail: room.roomApi.error,
    })
  );
  const { sendCreateRoom } = useCreateRoomSocket();

  const onChangeField = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ key: name, value }));
  };
  const onClickCreateRoom = () => {
    dispatch(createRoom(roomForm));
  };

  useEffect(() => {
    dispatch(initialize());

    return () => {
      dispatch(initialize());
    };
  }, []);
  useEffect(() => {
    if (createSuccess) {
      alert("방 생성이 완료했습니다.");
      sendCreateRoom(createSuccess, roomForm);
      window.location.replace(`/room/${createSuccess}`);
      // location.reload();
    }
    if (createFail) {
      alert(createFail);
      history.push("/room-create");
    }
  }, [createSuccess, createFail]);

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        border: 1,
        borderColor: "#81c784",
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Grid container rowSpacing={1.5}>
        <Grid item xs={12}>
          <RoomCreateHeaderForm>방 만들기</RoomCreateHeaderForm>
        </Grid>
        <Grid item xs={12} spacing={3}>
          <FieldComponent
            fieldTitle="방 이름"
            fieldType="text"
            fieldName="roomTitle"
            fieldValue={roomForm.roomTitle}
            onChangeField={onChangeField}
          />
        </Grid>
        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Button
              size="large"
              variant="contained"
              onClick={onClickCreateRoom}
            >
              방 생성
            </Button>
          </ButtonForm>
        </Grid>

        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Link to="/room">
              <Button size="large" variant="contained" color="error">
                뒤로가기
              </Button>
            </Link>
          </ButtonForm>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomCreateContainer;
