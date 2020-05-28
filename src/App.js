import React, { Component } from "react";
import Layout from "../src/HOC/Layout/Layout";
import BurgerBuilder from "../src/Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import ContactData from "./Containers/Checkout/ContactData/ContactData";

import { Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout/continue" component={ContactData} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
