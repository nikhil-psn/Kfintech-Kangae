import React, { Component } from "react";
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import Employees from "./Employees"
// import DisplayForm from "./DisplayForm";
// import Header from "../../components/Header";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import "./LandingPage.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
});

function LandingPage() {
  const classes = useStyles();

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <nav className="home">
        <h1>
          Welcome to{" "}
          <span className="blink" style={{ color: "#3c44b1" }}>
            Ideas
          </span>{" "}
          Portal{" "}
        </h1>

        <ul className="homepagetiles">
          <li>
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>
                <h5>
                  <EmojiObjectsOutlinedIcon
                    style={{ fontSize: "60px" }}
                    color="white"
                  />
                </h5>
                {/* <h5><ArrowForwardIosIcon style={{ fontSize: 30 }}/></h5> */}
              </span>
            </a>
          </li>
          <li>
            <Link to="/ideas">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span class="fab fa-facebook-f">
                <h5>View Ideas</h5>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/newIdea">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span class="fab fa-twitter">
                {" "}
                <h5>Got an Idea?</h5>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/test">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span class="fab fa-twitch">
                <h5>
                  <WbIncandescentOutlinedIcon
                    style={{ fontSize: "60px", transform: "rotate(180deg)" }}
                    color="white"
                  />
                </h5>
                {/* <h5><ArrowBackIosIcon  style={{ fontSize: 30 }}/> </h5> */}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;

// import React from "react";
// import { FaCode } from "react-icons/fa";
// import { Typography, Button, Form, message } from "antd";
// const { Title } = Typography;
// function LandingPage() {
//   return (
//     <div className="app">
//       <div style={{ maxWidth: "700px" }}>
//         <div style={{ textAlign: "center" }}>
//           <Title level={3}>Email Configurator</Title>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
