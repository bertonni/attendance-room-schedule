import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";

let theme = createTheme({
  palette: {
    ifgreen: {
      main: "#349A46",
      contrastText: "#fdfdfd",
    },
    ifred: {
      main: "#CA2128",
      contrastText: "#fdfdfd",
    },
    tonalOffset: 0.2,
  },
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          width: "100%",
          "& > div:first-of-type": {
            display: "flex",
            alignItems: "center",
          },
          "& > div:first-of-type > div:first-of-type": {
            display: "flex",
            pointerEvents: "none",
          },
          "& > div:first-of-type > div:first-of-type ~ div": {
            width: "30%",
          },
          "& div:first-of-type div[role=presentation]": {
            width: "50%",
          },
          "& div:first-of-type div[role=presentation] .MuiButtonBase-root": {
            display: "none",
          },
          "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
            color: `#fdfdfd !important`,
            // backgroundColor: `#349A46 !important`,
          },
        },
        viewTransitionContainer: {
          width: "100%",
          "& > div > div": {
            justifyContent: "space-between !important",
          },
          "& div[role=row]": {
            justifyContent: "space-between !important",
          },
        },
        "& div:first-of-type": {
          backgroundColor: "red",
        },
      },
    },
    MuiPickerStaticWrapper: {
      styleOverrides: {
        root: {
          width: "100%",
          marginLeft: 0,
          maxWidth: "800px",
          backgroundColor: 'transparent',
          "& div:first-of-type div:first-of-type": {
            width: "100%",
            margin: 0,
          },
          "& div div ~ div": {
            overflowX: "hidden",
            // margin: 0,
            width: "100%",
          },
          "& div div ~ div div:first-of-type": {
            // margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ScheduleProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ScheduleProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
