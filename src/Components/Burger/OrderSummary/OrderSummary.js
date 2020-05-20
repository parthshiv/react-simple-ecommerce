import React from "react";
import Aux from "../../../HOC/Auxilary";
import classes from "./OrderSummary.module.css";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>: &nbsp;
        {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order Summary </h3>
      <p>A Burger with the following ingredients:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Your Order Total: ${props.price}</strong>
      </p>
      <p>Continue to checkout?</p>
      <button
        onClick={props.clickedContinue}
        className={[classes.Button, classes.Success].join(" ")}
      >
        Continue
      </button>
      <button
        onClick={props.clickedCancel}
        className={[classes.Button, classes.Danger].join(" ")}
      >
        Cancel
      </button>
    </Aux>
  );
};

export default orderSummary;
