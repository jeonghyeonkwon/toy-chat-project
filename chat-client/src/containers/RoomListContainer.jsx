import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import RoomListComponent from "../components/RoomListComponent";
import { Link } from "react-router-dom";
import { useScribeRoomSocket } from "../lib/socket/roomSocket";

function RoomListContainer() {
  const { room } = useScribeRoomSocket();

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
            <Link to={`/room/${data.roomRandomId}`} key={data.roomRandomId}>
              <RoomListComponent roomInfo={data}></RoomListComponent>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomListContainer;
