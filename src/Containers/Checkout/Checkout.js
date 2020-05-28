import React, { Component } from "react";
import CheckoutSumary from "../../Components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
    canPurchase: false,
  };
  componentDidMount() {
    /* 
    // if data was passed in URL, it could be fetched like below
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let params in query.entries()) {
      ingredients[params[0]] = +ingredients[params[1]];
    }
    // End of code of fetching data passed from URL
     */

    // fetch data passed hiddenly as below
    //console.log(this.props);
    if (
      this.props.location.state &&
      this.props.location.state.ingredients &&
      this.props.location.state.price
    ) {
      const ingredients = this.props.location.state.ingredients;
      const totalPrice = this.props.location.state.price;
      this.setState({
        ingredients: ingredients,
        totalPrice: totalPrice,
        canPurchase: true,
      });
    }
  }
  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinuedHandler = () => {
    //this.props.history.replace("/checkout/continue");
    this.props.history.push("/checkout/continue", {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
    });
  };
  render() {
    let checkoutSummary = null;
    if (this.state.canPurchase) {
      checkoutSummary = (
        <CheckoutSumary
          ingredients={this.state.ingredients}
          clickedCancel={this.CheckoutCancelledHandler}
          clickedContinued={this.CheckoutContinuedHandler}
          price={this.state.totalPrice}
        />
      );
    } else {
      checkoutSummary = (
        <p style={{ textAlign: "center" }}>Your Cart is emplty!</p>
      );
    }
    return <div>{checkoutSummary} </div>;
  }
}

export default Checkout;
