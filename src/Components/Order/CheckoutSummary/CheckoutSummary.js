import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>You've choose delicious Burger!!</h1>
      <div className={classes.CheckoutSummaryDiv}>
        <Burger ingredients={props.ingredients} />
        <p>
          <strong>Your Order Total: ${props.price}</strong>
        </p>
      </div>
      <Button btnType="Danger" clicked={props.clickedCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.clickedContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
