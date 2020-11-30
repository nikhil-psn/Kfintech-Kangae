import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loader">
      <div class="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="base">
          <span></span>
          <div class="face"></div>
        </div>
      </div>
      <div class="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 class="redirect">Redirecting</h1>
    </div>
  );
}

export default Loading;
