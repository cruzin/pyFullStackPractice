import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Link } from "react-router-dom";
import { helpPageUrl } from "../pages/Routes";

export default function ComboBox({ optionsArray, redirect }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      autoHighlight={true}
      freeSolo
      onChange={(e, value, changeReason, details) => {
        if (e.keyCode === 13 && changeReason === "select-option") {
          redirect(helpPageUrl(value.url));
        }
      }}
      style={{ width: "80%", margin: "auto" }}
      options={optionsArray}
      getOptionLabel={(option) => option.title}
      renderOption={(option) => (
        <Link to={helpPageUrl(option.url)}>{option.title}</Link>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Article Search" variant="outlined" />
      )}
    />
  );
}
