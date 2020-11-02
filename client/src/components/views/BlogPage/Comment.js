import React from 'react';
 
const Comment = ( props ) => {
  return (
   <div className="Comment" id={props.index}>
    <p>{props.title}</p>
   </div>
  )
 };
 
 export default Comment;