import React from "react";
import { Box, Grid } from "@mui/material";
import RoomListComponent from "../components/RoomListComponent";

function RoomListContainer(props) {
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
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
        <Grid item xs={12}>
          <RoomListComponent></RoomListComponent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomListContainer;
