import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  purple: {
    // color: "232769",
    backgroundColor: "#232769",
  },
}));

export default function Header() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  // const name = user.userData
  //   ? user.userData.email.substring(0, 1).toUpperCase()
  //   : "A";

  // const profileButtonClicked = () => {
  //   window.location.assign("/profile");
  // };
  // useEffect(() => {
  //   console.log("the logged in user is :::");
  //   console.log(user);
  //   console.log(user.userData.email);
  // }, []);

  const logout = () => {
    axios.get("/api/users/logout", { _id: user.userData.id });
    window.location = "/login";
  };

  return (
    <div className="header__div">
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <Link to="/">
                <img
                  width="150px"
                  src="https://www.greatplacetowork.in/great/admin/uploads/company_logo/16961528141575979231.jpg"
                  alt=""
                />
              </Link>
              {/* <InputBase
              placeholder="Search topics"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            /> */}
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <Link to="/newIdea">
                <IconButton>
                  <AddCircleOutlineIcon />
                  {/* </a> */}
                </IconButton>
              </Link>
              <Link to="/analytics">
                <IconButton>
                  <EqualizerIcon />
                </IconButton>
              </Link>
              <Link to="/profile">
                <IconButton style={{ backgroundColor: "transparent" }}>
                  <PersonIcon />
                  {/* <Avatar className={classes.purple}>{name}</Avatar> */}
                </IconButton>
              </Link>
              <Link>
                <IconButton>
                  {/* <Badge badgeContent={4} color="secondary"> */}
                  <NotificationsNoneIcon fontSize="small" />
                  {/* </Badge> */}
                </IconButton>
              </Link>
              {/* <Badge badgeContent={3} color="primary"> */}
              <Link>
                <IconButton>
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
              </Link>
              {/* </Badge> */}
              <Link to="/admin">
                <IconButton>
                  <SupervisorAccountIcon fontSize="small" />
                </IconButton>
              </Link>
              {/* <Link to="/login"> */}
              <IconButton onClick={logout}>
                <PowerSettingsNewIcon />
                {/* <PowerSettingsNewIcon style={{ color: "blue" }} /> */}
              </IconButton>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
