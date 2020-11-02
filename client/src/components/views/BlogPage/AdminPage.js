import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import DisplayForm from "./DisplayForm";
import Header from "./Header";
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
});

function AdminPage() {
  const classes = useStyles();
  const name = "Nikhil";
  const admin = true;

  return (
    <div style={{ backgroundColor: "rgb(60,68,177)", paddingBottom: "15px" }}>
      <div
        style={{ minWidth: "100vw", minHeight: "100%" }}
        className={classes.appMain}
        style={{ backgroundColor: "#3C44B1" }}
      >
        <Header style={{ minHeight: "100vh" }} />
        <DisplayForm name={name} admin={admin} />
      </div>
    </div>
  );
}

export default AdminPage;
