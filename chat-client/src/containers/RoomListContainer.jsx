import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import RoomListComponent from "../components/RoomListComponent";
import { Link } from "react-router-dom";

import { SOCKET_DEFAULT_URL, ROOM_URL } from "../lib/api/socket";
import axios from "axios";
import { socket } from "../lib/api/socket";
function RoomListContainer() {
  const [room, setRoom] = useState([]);
  useEffect(() => {
    let loading = false;
    async function fetchRoomList() {
      const result = await axios.get(`${SOCKET_DEFAULT_URL}/api/room`);
      console.log(result);
      const roomList = result.data;
      console.log(roomList);
      setRoom(roomList);
    }
    fetchRoomList();
  }, []);

  useEffect(() => {
    console.log("asdasd");

    // socket.on("roomInfo", (data) => {
    //   console.log(data);
    //   setRoom([...room, data]);
    // });
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        backgroundColor: "#fff",
        padding: 1,
      }}
      style={{
        overflow: "scroll",
      }}
    >
      <Grid container rowSpacing={1} sx={12}>
        <Grid item xs={12}>
          {room.map((data) => (
            <Link to={`/room/${data.roomRandomId}`}>
              <RoomListComponent roomInfo={data}></RoomListComponent>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomListContainer;
