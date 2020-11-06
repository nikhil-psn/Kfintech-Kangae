import React from "react";

const Comment = (props) => {
  return (
    <div
      style={{ fontFamily: "ratiomedium" }}
      className="Comment"
      id={props.index}
    >
      <p>
        {props.title.comment} <small>-{props.title.commentBy}</small>
      </p>
    </div>
  );
};

export default Comment;
