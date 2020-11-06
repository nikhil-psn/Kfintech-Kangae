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

export default function IdeaPopup(props) {
  const user = useSelector((state) => state.user);
  const [commentVal, setCommentVal] = useState("");
  const [commentsChanged, setCommentsChanged] = useState("");
  const [ideaComments, setIdeaComments] = useState([props.popupidea.comments]);
  const classes = useStyles();

  // let userquestions = [{ id: 'fdsd', title: 'Why is the sky blue?' },
  // { id: 'adsf', title: 'Who invented pizza?' },
  // { id: 'afdsf', title: 'Is green tea overrated?' },] ;
  const [displayQuestions, setdisplayQuestions] = useState(false);

  const CommentInputChange = (e) => {
    setCommentVal(e.target.value);
  };

  const addComment = () => {
    console.log("Adding the comment:" + commentVal);
    const c = {
      comment: commentVal,
      commentBy: user.userData.email,
    };
    const variables = { ideaId: props.popupidea._id, comment: c };
    axios.post("/api/ideas/addComment", variables).then((response) => {
      if (response.data.success) {
        console.log("Comment added sucessfully - UI");
        axios.post("/api/ideas/getIdea", variables).then((response) => {
          if (response.data.success) {
            console.log("the modified idea used by UI is :");
            console.log(response.data.idea);
            setIdeaComments(response.data.idea.comments);
            setCommentsChanged(commentsChanged + 1);
            setCommentVal("");
          } else {
            alert("Something went wrong");
          }
        });
      }
    });
  };

  const displayQuestion = () => {
    console.log("The comments are:");
    console.log(ideaComments);
    console.log(displayQuestions);
    var d = !displayQuestions;
    // console.log(d);
    setdisplayQuestions(d);
  };
  var questions = ideaComments.map((c, index) => {
    return <Comment key={index} title={c} />;
  });

  useEffect(() => {
    const variables = { ideaId: props.popupidea._id };
    axios.post("/api/ideas/getIdea", variables).then((response) => {
      if (response.data.success) {
        console.log("the idea used by UI is :");
        console.log(response.data.idea);
        setIdeaComments(response.data.idea.comments);
        setCommentVal("");
      } else {
        alert("Something went wrong");
      }
    });
  }, []);

  useEffect(() => {
    console.log("The comments are : ");
    console.log(ideaComments);
    questions = displayQuestions ? (
      ideaComments.map((c, index) => {
        return <Comment key={index} title={c} />;
      })
    ) : (
      <div></div>
    );
    // console.log(questions)
  }, [displayQuestions, commentsChanged]);

  var visible = displayQuestions ? "" : "none";
  console.log(visible);

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
              style={{ color: "black", minHeight: "100px" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ color: "#3C44B1", fontFamily: "ratiobold" }}
              >
                {props.popupidea.title}
              </Typography>
              <Divider style={{ marginBottom: "8px", visibility: "hidden" }} />
              <Typography
                variant="body1"
                color="black"
                component="p"
                textAlign="left"
                style={{ fontFamily: "ratiolight" }}
              >
                Submitted by{" "}
                <strong>
                  {props.popupidea.anonymous
                    ? "An anonymous person"
                    : props.popupidea.email}
                </strong>{" "}
                | Created At<strong>{props.popupidea.time}</strong>
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
              <Typography
                variant="body1"
                color="black"
                component="p"
                textAlign="left"
                style={{ fontFamily: "ratiomedium" }}
              >
                {parse(props.popupidea.body)}
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
              <div className="votes" style={{ flexDirection: "row" }}>
                <ThumbUpAltIcon style={{ fontSize: 25 }} />
                <span className="votescount" style={{ marginRight: 8 }}>
                  {props.popupidea.likes.length -
                    props.popupidea.unlikes.length}
                </span>
                <ThumbDownAltIcon style={{ fontSize: 25, marginRight: 40 }} />
                <div
                  style={{
                    cursor: "pointer",
                    marginRight: 40,
                    display: "flex",
                    flexDirection: "row",
                  }}
                  onClick={displayQuestion}
                >
                  <CommentIcon style={{ marginRight: 4 }} /> Comment
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ display: visible }}>
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
                    placeholder="Add a comment"
                    multiline
                    value={commentVal}
                    onChange={CommentInputChange}
                    variant="filled"
                  />
                  <IconButton aria-label="search" onClick={addComment}>
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
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
              <Typography
                variant="body1"
                color="black"
                component="p"
                textAlign="left"
              >
                {questions}
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
