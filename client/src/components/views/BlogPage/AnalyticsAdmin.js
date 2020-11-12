import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import DisplayForm from "./DisplayForm";
import Header from "./Header";
import Analytics from "./Analytics";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
});

function AnalyticsAdmin() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const name = "Nikhil";
  const admin = true;

  useEffect(() => {
    if (user.userData) {
    } else {
      window.location = "/login";
    }
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(60,68,177)", paddingBottom: "15px" }}>
      <div
        style={{ minWidth: "100vw", minHeight: "100%" }}
        className={classes.appMain}
        style={{ backgroundColor: "#3C44B1" }}
      >
        <Header style={{ minHeight: "100vh" }} />
        <Analytics />
      </div>
    </div>
  );
}

export default AnalyticsAdmin;
