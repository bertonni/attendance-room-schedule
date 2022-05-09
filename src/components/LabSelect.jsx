import {
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function LabSelect() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: "500px",
        my: 2,
      }}
    >
      <FormControl fullWidth>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"LAB-F1"}
          readOnly
          disabled
        >
          <MenuItem value={"LAB-F1"}>
            Laboratório F1
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
