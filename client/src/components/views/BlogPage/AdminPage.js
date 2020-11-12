import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import DisplayForm from "./DisplayForm";
import Header from "./Header";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
});

function AdminPage() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
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
        <DisplayForm admin={admin} />
      </div>
    </div>
  );
}

export default AdminPage;
