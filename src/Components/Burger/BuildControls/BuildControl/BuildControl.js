import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label} </div>
      <button
        className={classes.Less}
        onClick={props.removeIngred}
        disabled={props.isDisabled}
      >
        -
      </button>
      <button className={classes.More} onClick={props.addIngred}>
        +
      </button>
    </div>
  );
};

export default buildControl;
