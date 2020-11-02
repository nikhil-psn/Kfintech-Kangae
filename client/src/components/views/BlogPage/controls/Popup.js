import React, { Component } from 'react';
import {Dialog, DialogTitle, makeStyles, DialogContent } from '@material-ui/core';
 
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Controls from "./Controls";
import { Close } from '@material-ui/icons';
 
//import ActionButton from "./ActionButton"
 
const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
 
  const useStyles = makeStyles(theme=>({
      dialogTitle:{
          paddingRight:"opx"
      }
  }))
 
export default function Popup(props){
    const{title, children, openPopup, setOpenPopup} = props;
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    return (
        <Dialog open={openPopup} maxWidth="md" >
             <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                 <div style={{display:"flex"}}>
                     <Typography variant="h6" component="div" style={{flexGrow:1}}>
                 Yayyy  !! Success <ThumbUpIcon color="primary" size="medium" style={{paddingTop : "0px" , marginBottom:"-3.2px"}} />
                 </Typography>
         {/* <Controls.ActionButton color="secondary" 
         onClick={()=>{setOpenPopup(false)}} >
             <CloseIcon size="small"/>
         </Controls.ActionButton> */}
                 </div>      
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{color:"black" ,fontSize:18,paddingLeft:"0px",paddingRight:"40px"}} >
           Thanks for contributing your valuable idea !!
          </Typography>         
       </DialogContent>     
        </Dialog>
    )
}