import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TrendingIdea from "./TrendingIdea.js";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

//this file is not needed anymore
//this file is not needed anymore
//this file is not needed anymore
//this file is not needed anymore
//this file is not needed anymore

export default function Trending(props) {
  const classes = useStyles();

  return (
    <div>
      {/* <List component="nav" className={classes.root} aria-label="contacts"> */}
      {/* <ListItemText inset style={{textAlign:"center",fontSize:"18px"}} > <strong>Trending</strong><WhatshotIcon style={{borderBottom:"-15px"}}/></ListItemText>
       */}
      {/* {renderList} */}
      {/* <ListItem button>
          <ListItemIcon>
            <WhatshotIcon fontSize="large" style={{ color: "#3C44B1" }} />
          </ListItemIcon>
          <ListItemText fontSize="large">
            {" "}
            <strong style={{ fontSize: "22px", color: "#3C44B1" }}>
              Trending
            </strong>
          </ListItemText>
        </ListItem>
      </List> */}
      <TrendingIdea refreshVal={props.refreshVal} />
    </div>
  );
}
