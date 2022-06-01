import React from "react";
import styledComponent from "styled-components";
import { Box, Grid, Button } from "@mui/material";
import FieldComponent from "../components/FieldComponent";
import { Link } from "react-router-dom";

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

function RoomCreateContainer(props) {
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
          <FieldComponent fieldTitle="방 이름" fieldType="text" />
        </Grid>

        <Grid item xs={6} spacing={1}>
          <ButtonForm>
            <Button size="large" variant="contained">
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
