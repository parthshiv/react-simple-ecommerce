import React, { Component } from "react";
//import { Route } from "react-router-dom";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Modal from "../../../Components/UI/Modal/Modal";
import Aux from "../../../HOC/Auxilary/Auxilary";
import axiosOrders from "../../../axios-orders";

class ContactData extends Component {
  state = {
    customer: {
      cName: "",
      cEmail: "",
      caStreet: "",
      zip: "",
    },
    ingredients: {},
    totalPrice: 0,
    deliveryMethod: "",
    showModal: false,
    showSpinner: false,
    orderMessages: {
      Success: "",
    },
  };
  HideModalHandler = () => {
    this.setState({
      showModal: false,
      orderMessages: { Success: "" },
    });
    this.props.history.push("/");
  };

  OrderNowHandler = (event) => {
    event.preventDefault();

    this.setState({ showModal: true, showSpinner: true });
    const orderData = {
      ingredients: this.props.location.state.ingredients,
      price: this.props.location.state.totalPrice,
      customer: this.state.customer,
      deliveryMethod: this.state.deliveryMethod,
    };

    axiosOrders
      .post("/orders.json", orderData)
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
      });
    return false;
  };

  handleChange(event) {
    const updatedCustomerData = {
      ...this.state.customer,
    };
    updatedCustomerData[event.target.name] = event.target.value;
    this.setState({
      customer: updatedCustomerData,
    });
  }
  render() {
    let spinnerData = null;
    if (this.state.showSpinner) {
      spinnerData = <Spinner />;
    } else if (this.state.orderMessages.Success !== "") {
      spinnerData = this.state.orderMessages.Success;
    }
    const conactContent = (
      <form>
        <input
          type="text"
          name="cName"
          ref="cName"
          placeholder="Your Name"
          onChange={(event) => this.handleChange(event)}
        />
        <input
          type="email"
          name="cEmail"
          ref="cName"
          placeholder="Your Email"
          onChange={(event) => this.handleChange(event)}
        />
        <input
          type="text"
          name="caStreet"
          ref="cName"
          placeholder="Your Address"
          onChange={(event) => this.handleChange(event)}
        />
        <input
          type="text"
          name="zip"
          ref="cName"
          placeholder="Postal Code"
          onChange={(event) => this.handleChange(event)}
        />

        <select
          name="deliveryMethod"
          ref="cName"
          onChange={(event) => {
            this.setState({
              deliveryMethod: event.target.value,
            });
          }}
        >
          <option value="">Select Shipping Method</option>
          <option value="LocalShipping">Local Shipping</option>
          <option value="ups">UPS</option>
          <option value="fastest">Fastest</option>
        </select>
        <Button btnType="Success" clicked={this.OrderNowHandler}>
          Order Now
        </Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Provide your contact details</h4>

        <Aux>
          <Modal isShow={this.state.showModal} clicked={this.HideModalHandler}>
            {spinnerData}
          </Modal>
          {conactContent}
        </Aux>
      </div>
    );
  }
}

export default ContactData;
