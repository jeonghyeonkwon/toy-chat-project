import React from "react";
import styledComponent from "styled-components";
import { TextField } from "@mui/material";

const FieldForm = styledComponent.div`
//   background-color: yellowgreen;
//   text-align:center;
  padding:20px;
`;

function FieldComponent({
  fieldTitle,
  fieldType,
  fieldName,
  fieldValue,
  onChangeField,
}) {
  return (
    <>
      <FieldForm>
        <TextField
          id="standard-basic"
          label={fieldTitle}
          type={fieldType}
          variant="standard"
          fullWidth
          name={fieldName}
          value={fieldValue}
          onChange={onChangeField}
        />
      </FieldForm>
    </>
  );
}

export default FieldComponent;
