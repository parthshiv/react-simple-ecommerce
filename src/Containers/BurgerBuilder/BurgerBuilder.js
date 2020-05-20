import React, { Component } from "react";
import Aux from "../../HOC/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDEIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.7,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 0,
    isPurchasable: false,
    showModal: false,
  };

  checkPurchasable(ingreds) {
    const SumOfIngreds = Object.keys(ingreds)
      .map((igKey) => {
        return ingreds[igKey];
      })
      .reduce((OldSum, newEl) => {
        return OldSum + newEl;
      }, 0);

    this.setState({
      isPurchasable: SumOfIngreds > 0, // this will return true or false
    });
  }
  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const oldPrice = this.state.totalPrice;
    const ingredPrices = INGREDEIENTS_PRICES[type];
    const updatedInregedients = {
      ...this.state.ingredients,
    };
    updatedInregedients[type] = updatedCount;
    this.setState({
      totalPrice: oldPrice + ingredPrices,
      ingredients: updatedInregedients,
    });
    this.checkPurchasable(updatedInregedients);
  };

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return; // return if less than 0 count
    const updatedCount = oldCount - 1;
    const oldPrice = this.state.totalPrice;

    const ingredPrices = INGREDEIENTS_PRICES[type];
    const updatedInregedients = {
      ...this.state.ingredients,
    };

    let finalPrice = oldPrice - ingredPrices;
    if (finalPrice <= 0) finalPrice = 0;
    updatedInregedients[type] = updatedCount;
    this.setState({
      totalPrice: finalPrice,
      ingredients: updatedInregedients,
    });
    this.checkPurchasable(updatedInregedients);
  };

  showModalHandler = () => {
    this.setState({
      showModal: true,
    });
  };

  HideModalHandler = () => {
    this.setState({
      showModal: false,
    });
  };

  continueCheckout = () => {
    alert("Checkout continue!");
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // this will return boolean, true/false
    }

    return (
      <Aux>
        <Modal isShow={this.state.showModal} clicked={this.HideModalHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            clickedCancel={this.HideModalHandler}
            clickedContinue={this.continueCheckout}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdd={this.addIngredientsHandler}
          ingredientsRemove={this.removeIngredientsHandler}
          price={this.state.totalPrice}
          disabledParam={disabledInfo}
          isPurchasable={this.state.isPurchasable}
          showModal={this.showModalHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
