import React from "react";
import Aux from "../../HOC/Auxilary";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <Aux>
      <div>header menu</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
export default layout;
