import React from "react";
import { Box, Grid } from "@mui/material";
import RoomListComponent from "../components/RoomListComponent";
import { Link } from "react-router-dom";
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
          <Link to={"/room/1"}>
            <RoomListComponent></RoomListComponent>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomListContainer;
