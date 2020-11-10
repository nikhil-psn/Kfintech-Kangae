import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { Layout, Menu } from "antd";
import axios from "axios";
import TypeAheadDropDown from "./SearchBar.js";
import makeAnimated from "react-select/animated";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { blue, red } from "@material-ui/core/colors";
import "./DisplayForm.css";
import IdeaPopup from "./controls/IdeaPopup";
import Paper from "@material-ui/core/Paper";
import Button from "react-bootstrap/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "react-select";
import { confirmAlert } from "react-confirm-alert"; // for confirm alert
import "react-confirm-alert/src/react-confirm-alert.css"; // for confirm alert

const animatedComponents = makeAnimated();
const optionsStatus = [
  { value: "Ideation", label: "Ideation" },
  { value: "Research", label: "Research" },
  { value: "Development", label: "Development" },
  { value: "Testing", label: "Testing" },
  { value: "Deployed", label: "Deployed" },
  { value: "Rejected", label: "Rejected" },
  { value: "Halted", label: "Halted" },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "&:hover": {
      background: "#F5F5F5",
    },
  },

  searchInput: {
    //opacity: '0.6',
    padding: `10px ${theme.spacing(1)}px`,
    backgroundColor: "#f2f2f2",
    borderRadius: "5px",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },

  root: {
    flexGrow: 1,
    maxWidth: 350,
    backgroundColor: "#e0ebeb",
  },
  media: {
    height: 0,
    paddingTop: "15.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[800],
  },
}));

export default function DisplayFormPaper(props) {
  const classes = useStyles();
  const [votes, setVotes] = useState(4);
  var selected_idea;
  const [openPopup, setOpenPopup] = useState(false);
  const [popupidea, setPopupidea] = useState("");
  const refreshVal = props.refreshVal;
  // const dropdownStatusValue = "Development";
  var editVariables;

  const [state, setState] = React.useState({
    sortBy: "",
    state: "",
    department: "",
    age: "",
    name: "hai",
  });

  const isNikhil = (value) => {
    return value != "Nikhil";
  };

  const likeIdea = (idea) => {
    var v = votes;
    v = v + 1;
    setVotes(v);
    console.log("liking the post:");
    console.log(idea._id);
    if (idea.likes.includes("Nikhil")) {
      console.log("already liked the idea");
    } else {
      if (idea.unlikes.includes("Nikhil")) {
        const unlikes = idea.unlikes.filter(isNikhil);
        const likes = idea.likes.push("Nikhil");
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
              console.log("liked the idea and removed from unliked");
              props.refreshValChanged(refreshVal + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      } else {
        const likes = idea.likes.push("Nikhil");
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: idea.likes,
            unlikes: idea.unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("just liked the idea");
              props.refreshValChanged(refreshVal + 1);
            } else {
              alert("Couldnt like the  idea");
            }
          });
      }
    }
  };

  const unlikeIdea = (idea) => {
    var v = votes;
    v = v + 1;
    setVotes(v);
    console.log("unliked the post:");
    console.log(idea._id);
    if (idea.unlikes.includes("Nikhil")) {
      console.log("already unliked the idea");
    } else {
      if (idea.likes.includes("Nikhil")) {
        const likes = idea.likes.filter(isNikhil);
        const unlikes = idea.unlikes.push("Nikhil");
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
              console.log("unliked the idea and removed from liked");
              props.refreshValChanged(refreshVal + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      } else {
        const unlikes = idea.unlikes.push("Nikhil");
        axios
          .post("/api/ideas/likeIdea", {
            ideaId: idea._id,
            likes: idea.likes,
            unlikes: idea.unlikes,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.idea);
              console.log(idea.likes);
              console.log("just unliked the idea");
              props.refreshValChanged(refreshVal + 1);
            } else {
              alert("Couldnt unlike the  idea");
            }
          });
      }
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const deletePost = (idea) => {
    console.log("the idea being deleted is : ");
    console.log(idea);
    axios.delete("/api/ideas/deleteIdea/" + idea._id).then((response) => {
      if (response.data.success) {
        console.log("Deleted the idea : ");
        console.log(response.data.idea);
        props.refreshValChanged(refreshVal + 1);
        // props.refreshVal=props.refreshVal+1;
      } else {
        alert("Couldnt delete the  idea");
      }
    });
  };

  //for confirm  alert
  const submit = () => {
    // e.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to change the status",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("Editing the idea,");
            console.log(editVariables);
            axios
              .patch("/api/ideas/editIdea", editVariables)
              .then((response) => {
                if (response.data.success) {
                  console.log("Edited the idea,");
                  console.log(response.data.idea);
                  props.refreshValChanged(refreshVal + 1);
                } else {
                  alert("Couldn't change the status for this idea");
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            alert("Clicked No");
            // const userName = prompt("Please Enter your Name");
            // console.log("The name is : ", userName);
          },
        },
      ],
    });
  };

  const StatusChanged = (value) => {
    console.log("Status changed to :");
    console.log(value.value);
    editVariables = {
      ideaId: selected_idea._id,
      title: selected_idea.title,
      email: selected_idea.email,
      category: selected_idea.category,
      body: selected_idea.body,
      anonymous: selected_idea.anonymous,
      likes: selected_idea.likes,
      unlikes: selected_idea.unlikes,
      comments: selected_idea.comments,
      time: selected_idea.time,
      status: value.value,
    };
    // console.log("Editing the idea,");
    // console.log(variables);
    submit();
    // axios.patch("/api/ideas/editIdea", variables).then((response) => {
    //   if (response.data.success) {
    //     console.log("Edited the idea,");
    //     console.log(response.data.idea);
    //     props.refreshValChanged(refreshVal + 1);
    //   } else {
    //     alert("Couldn't change the status for this idea");
    //   }
    // });
  };

  const ideasList = props.ideas.map((some_idea) => {
    return (
      <Paper
        id={some_idea._id + "paper"}
        className={classes.paper}
        // className="paper"
        elevation={3}
        style={{ paddingBottom: "10px", overflowX: "auto" }}
      >
        <div className="post" id={some_idea._id + "div"}>
          <div
            className="votes"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconButton>
              <ThumbUpAltIcon
                style={{ fontSize: 25, color: "#008450" }}
                onClick={() => likeIdea(some_idea)}
              />
            </IconButton>
            <span className="votescount" style={{ fontSize: 22 }}>
              {some_idea.likes.length - some_idea.unlikes.length}
            </span>
            <IconButton>
              <ThumbDownAltIcon
                style={{ fontSize: 25, color: "#F32013" }}
                onClick={() => unlikeIdea(some_idea)}
              />
            </IconButton>
          </div>
          <div
            className="post__content"
            onClick={() => {
              setPopupidea(some_idea);
              setOpenPopup(true);
            }}
          >
            <div className="post__title">
              <Typography
                gutterBottom
                variant="h5"
                style={{
                  fontSize: "1.3rem",
                  fontFamily: "ratiobold",
                  color: "#232769",
                }}
                component="h3"
              >
                {some_idea.title}
              </Typography>
            </div>
            <div className="post__status">
              Submitted by{" "}
              <strong>
                {some_idea.anonymous ? "An anonymous person" : some_idea.email}
              </strong>{" "}
              | Created at <strong>{some_idea.time}</strong> |{" "}
              <span className="dept">{some_idea.category}</span>
            </div>
          </div>
          {props.admin && (
            <div className="more">
              {/* <button onClick={submit}>Confirm dialog</button> */}
              <Select
                id="dropdownStatus"
                // value={dropdownStatusValue}
                className="status"
                onChange={(e) => {
                  selected_idea = some_idea;
                  StatusChanged(e);
                }}
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Status"
                options={optionsStatus}
                style={{ padding: "10px" }}
              />
              <IconButton>
                <DeleteIcon
                  onClick={(e) => {
                    e.preventDefault();
                    deletePost(some_idea);
                  }}
                />
              </IconButton>
            </div>
          )}
        </div>
      </Paper>
    );
  });

  return (
    <div>
      {ideasList}
      <IdeaPopup
        id={"IdeaPopup"}
        popupidea={popupidea}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></IdeaPopup>
    </div>
  );
}
