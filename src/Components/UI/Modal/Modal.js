import React from "react";
import classes from "./Modal.module.css";

const modal = (props) => {
  return (
    <div
      className={classes.Modal}
      style={{
        //display: props.isShow ? "block" : "none",
        transform: props.isShow ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.isShow ? "1" : "0",
      }}
    >
      <button className={classes.closeButton} onClick={props.clicked}>
        X
      </button>
      {props.children}
    </div>
  );
};

export default modal;
