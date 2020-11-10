import React, { useEffect, useState } from "react";
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
import SendIcon from "@material-ui/icons/Send";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { db } from "../../firebase.js";
import firebase from "firebase";
import "./ChatContent.css";
import ScrollToBottom from "react-scroll-to-bottom";
// import { css } from "emotion";

const ROOT_CSS = css({
  height: 600,
  width: 400,
});

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
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [messageVal, setMessageVal] = useState("");

  useEffect(() => {
    db.collection("chats")
      .doc(props.chat.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

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

  return (
    // <Paper
    //   className={classes.pageContent}
    //   style={{ height: "100%", backGroundColor: "red" }}
    // >
    //   <div className={classes.root}>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12}>
    //         <Paper
    //           className={classes.paper}
    //           style={{ color: "black", minHeight: "500px", minWidth: "700px" }}
    //         >
    //           <h3>{props.chat.data.name}</h3>
    // <div style={{ width: "700px", height: "200px" }}>
    <ScrollToBottom className={ROOT_CSS}>
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
    </ScrollToBottom>
    // </div>
    //           <Typography
    //             variant="body1"
    //             color="black"
    //             component="p"
    //             textAlign="left"
    //           >
    //             <div style={{ display: "flex", flexDirection: "row" }}>
    //               <TextField
    //                 style={{
    //                   width: "90%",
    //                   borderRadius: "50px",
    //                   fontFamily: "ratiomedium",
    //                 }}
    //                 id="commentTextArea"
    //                 placeholder="Add a message"
    //                 multiline
    //                 value={messageVal}
    //                 onChange={MessageInputChange}
    //                 variant="filled"
    //               />
    //               <IconButton aria-label="search" onClick={addMessage}>
    //                 <SendIcon
    //                   color="primary"
    //                   style={{
    //                     fontSize: "3rem",
    //                     cursor: "pointer",
    //                     marginLeft: "8px",
    //                   }}
    //                 />
    //               </IconButton>
    //             </div>
    //           </Typography>
    //         </Paper>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </Paper>
  );
}
