import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem>
      <NavLink to="/" exact>
        Burger Builder
      </NavLink>
    </NavigationItem>
    <NavigationItem>
      <NavLink to="/checkout">Checkout</NavLink>
    </NavigationItem>

    {/* <NavigationItem link="/" active>
      
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem> */}
  </ul>
);

export default navigationItems;
