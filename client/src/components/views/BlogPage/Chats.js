import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ChatPopup from "./controls/ChatPopup";
import { useSelector } from "react-redux";
import MessageIcon from "@material-ui/icons/Message";

import "./TrendingIdea.css";
import { db } from "../../firebase.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  rootTrending: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#e0ebeb",
  },
}));

export default function Chats(props) {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [chats, setChats] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupidea, setPopupidea] = useState("");

  const newChat = (e) => {
    e.preventDefault();
    const name = prompt("Enter a name for your chat");
    db.collection("chats").add({
      name: name,
      members: user.userData.email.split(" "),
    });
  };

  useEffect(() => {
    db.collection("chats")
      .where("members", "array-contains", user.userData.email)
      .onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const chatsList = chats.map((t) => {
    return (
      <div>
        <List
          component="nav"
          className={classes.rootTrending}
          aria-label="contacts"
          onClick={() => {
            setPopupidea(t);
            setOpenPopup(true);
          }}
        >
          <ListItem button className={classes.rootTrending}>
            <ListItemIcon>
              <MessageIcon style={{ color: "#3C44B1" }} />
            </ListItemIcon>
            <ListItemText className="trending__title">
              {t.data.name}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );
  });

  return (
    <div>
      <ChatPopup
        id="chatPopup"
        chat={popupidea}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></ChatPopup>
      <List
        component="nav"
        className={classes.rootTrending}
        aria-label="contacts"
        onClick={newChat}
      >
        <ListItem button className={classes.rootTrending}>
          <ListItemText className="trending__title">
            Start a new chat
          </ListItemText>
        </ListItem>
      </List>
      {chatsList}
    </div>
  );
}
