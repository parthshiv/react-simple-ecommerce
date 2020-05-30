import React, { Component } from "react";
import CheckoutSumary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
class Checkout extends Component {
  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinuedHandler = () => {
    //this.props.history.replace("/checkout/continue");
    this.props.history.push("/checkout/continue");
  };
  render() {
    let checkoutSummary = null;

    if (this.props.canPurchase) {
      checkoutSummary = (
        <CheckoutSumary
          ingredients={this.props.ingreds}
          clickedCancel={this.CheckoutCancelledHandler}
          clickedContinued={this.CheckoutContinuedHandler}
          price={this.props.totalPrice}
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
const mapStateToProps = (state) => {
  return {
    ingreds: state.ingredients,
    totalPrice: state.totalPrice,
    canPurchase: state.totalPrice ? true : false,
  };
};
export default connect(mapStateToProps)(Checkout);
