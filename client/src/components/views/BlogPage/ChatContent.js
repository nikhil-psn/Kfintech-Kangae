import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import EmployeeForm from "./Section.js/EmployeeForm.js";
import PageHeader from "./Section.js/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  Paper,
  makeStyles,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "./Comment";
import { Editor } from "@tinymce/tinymce-react";
import Controls from "./controls/Controls";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import SendIcon from "@material-ui/icons/Send";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import { db } from "../../firebase.js";
import firebase from "firebase";
import "./ChatContent.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { animateScroll } from "react-scroll";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "axios";

// import { css } from "emotion";

// const ROOT_CSS = css({
//   height: 600,
//   width: 400,
// });
const animatedComponents = makeAnimated();
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
    fontFamily: "ratiobold",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontFamily: "ratiobold",
  },
}));

export default function ChatPopup(props) {
  const selectInputRef = useRef();
  const selectInputRef1 = useRef();
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [messageVal, setMessageVal] = useState("");
  const [emails, setEmails] = useState([]);
  const [existingMembers, setExistingMembers] = useState([]);
  const [Members, setMembers] = useState([]);
  const [addMember, setAddMember] = useState([]);
  const [removeMember, setRemoveMember] = useState([]);

  const includes = (e) => !Members.includes(e);

  useEffect(() => {
    db.collection("chats")
      .doc(props.chat.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

    db.collection("chats")
      .doc(props.chat.id)
      .onSnapshot((snapshot) => {
        console.log("The snapshot's members is ::");
        console.log(snapshot.data().members);
        setMembers(snapshot.data().members);
      });
  }, []);

  useEffect(() => {
    const ExistingMembers = [];
    Members.map((m) => {
      console.log("The exiting memebers list is ::");
      console.log(existingMembers);
      ExistingMembers.push({
        value: m,
        label: m,
      });
    });
    setExistingMembers(ExistingMembers);
  }, [Members]);

  useEffect(() => {
    axios.get("/api/users/getEmails").then((response) => {
      if (response.data.success) {
        console.log("the emails fetched are : ");
        console.log(response.data.emails);
        const emailsFiltered = response.data.emails.filter(includes);
        const Emails = [];
        var i;
        for (i = 0; i < emailsFiltered.length; i++) {
          console.log(emailsFiltered[i]);
          Emails.push({
            value: emailsFiltered[i],
            label: emailsFiltered[i],
          });
        }
        setEmails(Emails);
        console.log("the emails are : ");
        console.log(Emails);
      } else {
        alert("Couldnt get emails list");
        setEmails([]);
      }
    });
  }, [existingMembers]);

  const MessageInputChange = (e) => {
    setMessageVal(e.target.value);
  };

  const addMessage = () => {
    console.log("Adding the message:" + messageVal);
    db.collection("chats").doc(props.chat.id).collection("messages").add({
      message: messageVal,
      name: user.userData.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const addButton = () => {
    var m = [];
    db.collection("chats")
      .doc(props.chat.id)
      .update({
        members: [...Members, ...addMember],
      });
    selectInputRef.current.select.clearValue();
  };

  const addMembers = (value) => {
    if (value != null) {
      const values = value.map((v) => v.value);
      console.log(values);
      setAddMember(values);
    }
  };

  const removeButton = () => {
    var m = Members.filter((m) => !removeMember.includes(m));
    db.collection("chats")
      .doc(props.chat.id)
      .update({
        members: [...m],
      });
    selectInputRef1.current.select.clearValue();
  };

  const removeMembers = (value) => {
    if (value != null) {
      const values = value.map((v) => v.value);
      console.log(values);
      setRemoveMember(values);
    }
  };

  const scrollBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "scroll__div",
    });
  };

  return (
    <Paper
      className={classes.pageContent}
      style={{ height: "100%", backGroundColor: "red" }}
    >
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              className={classes.paper}
              style={{ color: "black", minHeight: "500px", minWidth: "700px" }}
            >
              <div className="invite_remove">
                <div className="invite">
                  <Select
                    style={{ fontFamily: "ratiomedium" }}
                    id="dropdownAdd"
                    ref={selectInputRef}
                    onChange={addMembers}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    placeholder="Invite to this chat"
                    options={emails}
                    style={{ padding: "10px" }}
                  />
                  <IconButton aria-label="search" onClick={addButton}>
                    <AddBoxIcon
                      color="primary"
                      style={{
                        fontSize: "3rem",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    />
                  </IconButton>
                </div>
                <div className="remove">
                  <Select
                    style={{ fontFamily: "ratiomedium" }}
                    id="dropdownAdd"
                    ref={selectInputRef1}
                    onChange={removeMembers}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    placeholder="Members of this chat"
                    options={existingMembers}
                    style={{ padding: "10px" }}
                  />
                  <IconButton aria-label="search" onClick={removeButton}>
                    <DeleteForeverIcon
                      color="primary"
                      style={{
                        fontSize: "3rem",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    />
                  </IconButton>
                </div>
              </div>
              <h3>{props.chat.data.name}</h3>
              {messages.map((message) => (
                <p
                  className={`chat__message ${
                    message.name == user.userData.email && "chat__receiver"
                  }`}
                >
                  <span className="chat__name">{message.name}</span>
                  {message.message}
                  <span className="chat__timestamp">
                    {message.timestamp
                      ? new Date(message.timestamp.toDate()).toLocaleString()
                      : ""}
                  </span>
                </p>
              ))}
              <Typography
                variant="body1"
                color="black"
                component="p"
                textAlign="left"
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    style={{
                      width: "90%",
                      borderRadius: "50px",
                      fontFamily: "ratiomedium",
                    }}
                    id="commentTextArea"
                    placeholder="Add a message"
                    multiline
                    value={messageVal}
                    onChange={MessageInputChange}
                    variant="filled"
                  />
                  <IconButton aria-label="search" onClick={addMessage}>
                    <SendIcon
                      color="primary"
                      style={{
                        fontSize: "3rem",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    />
                  </IconButton>
                </div>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
