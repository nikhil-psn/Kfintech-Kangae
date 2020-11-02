import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IdeaPopup from "./controls/IdeaPopup";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TrendingIdea() {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupidea, setPopupidea] = useState("");

  useEffect(() => {
    axios.get("/api/ideas/getTrending").then((response) => {
      if (response.data.success) {
        // console.log(response.data.ideas);
        setTrending(response.data.ideas);
      } else {
        alert("Couldnt get trending idea`s lists");
      }
    });
  }, []);

  return trending.map((t) => {
    return (
      <div>
        <List
          component="nav"
          className={classes.root}
          aria-label="contacts"
          onClick={() => {
            setPopupidea(t);
            setOpenPopup(true);
          }}
        >
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon style={{ color: "#3C44B1" }} />
            </ListItemIcon>
            <ListItemText>{t.title}</ListItemText>
          </ListItem>
        </List>
        <IdeaPopup
          id={t._id + "popup"}
          popupidea={popupidea}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        ></IdeaPopup>
      </div>
    );
  });
}
