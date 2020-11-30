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
import { useHistory } from "react-router-dom";
// import { useHistory, hashHistory } from "react-router-dom";

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
  const [refreshVal, setRefreshVal] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [commentVal, setCommentVal] = useState("");
  const [commentsChanged, setCommentsChanged] = useState("");
  const [idea, setIdea] = useState(props.popupidea);
  const [ideaComments, setIdeaComments] = useState([props.popupidea.comments]);
  const classes = useStyles();
  const history = useHistory();

  // let userquestions = [{ id: 'fdsd', title: 'Why is the sky blue?' },
  // { id: 'adsf', title: 'Who invented pizza?' },
  // { id: 'afdsf', title: 'Is green tea overrated?' },] ;
  const [displayQuestions, setdisplayQuestions] = useState(false);

  const CommentInputChange = (e) => {
    setCommentVal(e.target.value);
  };
  const isNikhil = (value) => {
    return value != user.userData.email;
  };

  const likeIdea = (idea) => {
    console.log("liking the post:");
    console.log(idea._id);
    if (idea.likes.includes(user.userData.email)) {
      console.log("already liked the idea");
    } else {
      if (idea.unlikes.includes(user.userData.email)) {
        const unlikes = idea.unlikes.filter(isNikhil);
        const likes = [...idea.likes, user.userData.email];
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: likes,
            unlikes: unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("liked the idea and removed from unliked");
              props.refreshValChanged(refreshVal + 1);
              setRefresh(refresh + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      } else {
        const likes = [...idea.likes, user.userData.email];
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: likes,
            unlikes: idea.unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("just liked the idea");
              props.refreshValChanged(refreshVal + 1);
              // props.refreshValChanged(refreshVal + 1);
              setRefresh(refresh + 1);
            } else {
              alert("Couldnt like the  idea");
            }
          });
      }
    }
  };

  const unlikeIdea = (idea) => {
    console.log("unliked the post:");
    console.log(idea._id);
    if (idea.unlikes.includes(user.userData.email)) {
      console.log("already unliked the idea");
    } else {
      if (idea.likes.includes(user.userData.email)) {
        const likes = idea.likes.filter(isNikhil);
        const unlikes = [...idea.unlikes, user.userData.email];
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: likes,
            unlikes: unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("unliked the idea and removed from liked");

              // props.refreshValChanged(refreshVal + 1);
              props.refreshValChanged(refreshVal + 1);
              setRefresh(refresh + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      } else {
        const unlikes = [...idea.unlikes, user.userData.email];
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: idea.likes,
            unlikes: unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("just unliked the idea");
              props.refreshValChanged(refreshVal + 1);
              // props.refreshValChanged(refreshVal + 1);
              setRefresh(refresh + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      }
    }
  };

  const addComment = () => {
    console.log("Adding the comment:" + commentVal);
    const c = {
      comment: commentVal,
      commentBy: user.userData.email,
    };
    const variables = { ideaId: idea._id, comment: c };
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
    const variables = { ideaId: idea._id };
    axios.post("/api/ideas/getIdea", variables).then((response) => {
      if (response.data.success) {
        console.log("the idea used by UI is :");
        console.log(response.data.idea);
        setIdea(response.data.idea);
        setIdeaComments(response.data.idea.comments);
        setCommentVal("");
      } else {
        alert("Something went wrong");
      }
    });
    return () => {
      // hashHistory.goBack();
      // history.push("/ideas");
    };
  }, [refresh]);

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
                {idea.title}
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
                  {idea.anonymous ? "An anonymous person" : idea.email}
                </strong>{" "}
                | Created At{" "}
                <strong>{new Date(idea.time).toLocaleString()}</strong>
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
              <Typography
                variant="body1"
                color="black"
                component="p"
                textAlign="left"
                style={{ fontFamily: "ratiomedium" }}
              >
                {parse(idea.body)}
              </Typography>
              <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
              <div
                className="votes"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <IconButton>
                  <ThumbUpAltIcon
                    style={{ fontSize: 25, color: "#008450" }}
                    onClick={() => likeIdea(idea)}
                  />
                </IconButton>
                <span className="votescount" style={{ marginRight: 8 }}>
                  {idea.likes.length - idea.unlikes.length}
                </span>
                <IconButton>
                  <ThumbDownAltIcon
                    style={{ fontSize: 25, color: "#F32013" }}
                    onClick={() => unlikeIdea(idea)}
                  />
                </IconButton>
                <div
                  style={{
                    cursor: "pointer",
                    marginLeft: 40,
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
