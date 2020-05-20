import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const buildControl = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <b>${props.price.toFixed(2)}</b>
      </p>
      {controls.map((cntrKey) => {
        return (
          <BuildControl
            label={cntrKey.label}
            key={cntrKey.label}
            addIngred={() => props.ingredientsAdd(cntrKey.type)}
            removeIngred={() => props.ingredientsRemove(cntrKey.type)}
            isDisabled={props.disabledParam[cntrKey.type]}
          />
        );
      })}
      <button
        disabled={!props.isPurchasable}
        className={classes.OrderButton}
        onClick={props.showModal}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControl;
