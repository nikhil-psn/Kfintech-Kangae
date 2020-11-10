import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  Paper,
  makeStyles,
  DialogContent,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//import Button from '@material-ui/core/Button';
//import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Controls from "./Controls";
import { Close } from "@material-ui/icons";
import ChatContent from "../ChatContent.js";
import ActionButton from "./ActionButton";

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={props.openPopup}
      maxWidth="md"
      onBackdropClick={() => {
        props.setOpenPopup(false);
      }}
    >
      <DialogContent dividers style={{ backgroundColor: "#3C44B1" }}>
        <ChatContent chat={props.chat} />
      </DialogContent>
    </Dialog>
  );
}
