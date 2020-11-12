import React, { useEffect } from "react";
import Employees from "./Employees";
import Header from "../Header.js";
import { useSelector } from "react-redux";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
});

function NewIdeaPage() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.userData) {
    } else {
      window.location = "/login";
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ backgroundColor: "rgb(60,68,177)", paddingBottom: "15px" }}>
        <div
          style={{ minWidth: "100vw", minHeight: "100vh" }}
          className={classes.appMain}
          style={{ backgroundColor: "#3C44B1" }}
        >
          <Header style={{ minHeight: "100vh" }} />
          <Employees />
        </div>
      </div>
    </div>
  );
}

export default NewIdeaPage;
