import React, { Component } from "react";
import Aux from "../../HOC/Auxilary/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axiosOrders from "../../axios-orders";
import errorHandler from "../../HOC/ErrorHandler/ErrorHandler";

const INGREDEIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.7,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    isPurchasable: false,
    showModal: false,
    showSpinner: false,
    orderMessages: {
      Success: "",
      Failed: "",
    },
    error: null,
  };

  componentDidMount() {
    axiosOrders
      .get("/ingredients.json")
      .then((response) => {
        //console.log(response);
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

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
      orderMessages: { Success: "" },
    });
  };

  continueCheckout = () => {
    //alert("Checkout continue!");
    /* this.setState({ showSpinner: true });
    const orderData = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Parth Parmar",
        email: "test@test.com",
        address: {
          street: "demo street",
          city: "Ahmedabad",
          state: "Gujarat",
          zipCode: "380013",
          country: "India",
        },       
      },
       deliveryMethod: "LocalShipping",
    };

    axiosOrders
      .post("/orders.json", orderData) // in firebase, we need to pass .json extension. we don't need to pass table name, whatever you will pass before .json, it will create table with that name. So here i passed orders.json because i want to save in orders table.
      .then((response) => {
        if (response) {
          this.setState({
            showSpinner: false,
            orderMessages: {
              Success: "Order Placed Successfully, Thank you!",
            },
          });
        } else {
          this.setState({
            showSpinner: false,
            showModal: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          showSpinner: false,
          showModal: false,
        });
      }); */
    //console.log(this.props);

    // pass data to checkout page in URL, like GET method for example
    /* const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    }); */

    // pass data to checkout page hiddenly, like POST method for example
    this.props.history.push("/checkout", {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // this will return boolean, true/false
    }

    //else if (this.state.orderMessages.Failed !== "") {
    //   orderSummary = this.state.orderMessages.Failed;
    // }

    let burger = <Spinner />;
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          clickedCancel={this.HideModalHandler}
          clickedContinue={this.continueCheckout}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.showSpinner) {
      orderSummary = <Spinner />;
    } else if (this.state.orderMessages.Success !== "") {
      orderSummary = this.state.orderMessages.Success;
    }

    return (
      <Aux>
        <Modal isShow={this.state.showModal} clicked={this.HideModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default errorHandler(BurgerBuilder, axiosOrders);
