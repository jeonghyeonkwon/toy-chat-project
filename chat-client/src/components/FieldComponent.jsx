import React from "react";
import styledComponent from "styled-components";
import { TextField } from "@mui/material";

const FieldForm = styledComponent.div`
//   background-color: yellowgreen;
//   text-align:center;
  padding:20px;
`;

function FieldComponent({ fieldTitle, fieldType }) {
  return (
    <>
      <FieldForm>
        <TextField
          id="standard-basic"
          label={fieldTitle}
          type={fieldType}
          variant="standard"
          fullWidth
        />
      </FieldForm>
    </>
  );
}

export default FieldComponent;
