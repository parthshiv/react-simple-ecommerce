import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../HOC/Auxilary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.isShow} clicked={props.clicked} />
      <div
        className={classes.Modal}
        style={{
          transform: props.isShow ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.isShow ? "1" : "0",
        }}
      >
        <button className={classes.closeButton} onClick={props.clicked}>
          X
        </button>
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
