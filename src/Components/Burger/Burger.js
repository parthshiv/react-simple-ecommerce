import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  //console.log(props.ingredients);
  const igProps = Object.keys(props.ingredients); // returns/create the keys of Array's keys
  //console.log(igProps);
  // loop based on main array's Keys
  let dynamicIngredients = igProps
    .map((igKey) => {
      const newArr = [...Array(props.ingredients[igKey])];
      //console.log(newArr);
      // now below line will loop based on value of ingredients, i.e cheese is 2 then loop 2 times for cheese
      return newArr.map((_, i) => {
        return <BurgerIngredients key={igKey + i + 1} type={igKey} />;
      });
    })
    /**** reduce is inbuilt javascript function for arrays. It automatically accepts 2 arguments. Previous value and current value. It also accept an initial value, for example an empty array [].  For more infor, please read guide about reduce.
     *****/
    .reduce((oldArr, newArr) => {
      return oldArr.concat(newArr);
    }, []);

  if (dynamicIngredients.length === 0) {
    dynamicIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {dynamicIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
