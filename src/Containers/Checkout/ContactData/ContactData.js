import React, { Component } from "react";
//import { Route } from "react-router-dom";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Modal from "../../../Components/UI/Modal/Modal";
import Aux from "../../../HOC/Auxilary/Auxilary";
import axiosOrders from "../../../axios-orders";
const validEmailRegex = RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]/gim);

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
    deliveryMethod: "LocalShipping",
    showModal: false,
    showSpinner: false,
    orderMessages: {
      Success: "",
    },
    errors: {
      cName: "",
      cEmail: "",
      caStreet: "",
      zip: "",
      deliveryMethod: "",
    },
    canSubmit: false,
    showErrorMsg: false,
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

  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state.errors);
    if (this.state.canSubmit) {
      this.OrderNowHandler(event);
    } else {
      this.setState({ showErrorMsg: true });
    }
  };
  handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;
    let cnt = 0;
    switch (name) {
      case "cName":
        if (value === "") {
          errors.cName = "Please provide your Name";
          cnt++;
        } else {
          errors.cName = "";
        }

        break;
      case "cEmail":
        if (!validEmailRegex.test(value)) {
          errors.cEmail = "Email is not valid!";
          cnt++;
        } else {
          errors.cEmail = "";
        }

        break;
      case "caStreet":
        if (value === "") {
          errors.caStreet = "Please provide your Address";
          cnt++;
        } else {
          errors.caStreet = "";
        }

        break;
      case "zip":
        if (value.length < 6) {
          errors.zip = "zip must be 6 characters long!";
          cnt++;
        } else {
          errors.zip = "";
        }

        break;

      default:
        break;
    }
    //console.log(cnt);
    if (cnt === 0) {
      this.setState({
        canSubmit: true,
      });
    } else {
      this.setState({
        canSubmit: false,
      });
    }
    this.setState({ errors, [name]: value }, () => {
      //console.log(errors);
    });
    const updatedCustomerData = {
      ...this.state.customer,
    };
    updatedCustomerData[event.target.name] = event.target.value;
    this.setState({
      customer: updatedCustomerData,
    });
  }
  render() {
    const { errors } = this.state;
    let spinnerData = null;
    if (this.state.showSpinner) {
      spinnerData = <Spinner />;
    } else if (this.state.orderMessages.Success !== "") {
      spinnerData = this.state.orderMessages.Success;
    }
    let errorMsg = null;
    if (this.state.showErrorMsg)
      errorMsg = (
        <span className={classes.error}>
          All fields marked with (*) is mendatory!
        </span>
      );
    const conactContent = (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className={classes.Fields}>
          <label className={classes.Label}>Name: </label>
          <input
            type="text"
            name="cName"
            required="required"
            placeholder="Your Name"
            onChange={(event) => this.handleChange(event)}
            noValidate
          />
          <span className={classes.errorStar}> * </span>
        </div>
        {errors.cName.length > 0 && (
          <span className={classes.error}>{errors.cName}</span>
        )}
        <div className={classes.Fields}>
          <label className={classes.Label}>Email: </label>
          <input
            type="email"
            name="cEmail"
            required
            placeholder="Your Email"
            onChange={(event) => this.handleChange(event)}
            noValidate
          />
          <span className={classes.errorStar}> * </span>
        </div>
        {errors.cEmail.length > 0 && (
          <span className={classes.error}>{errors.cEmail}</span>
        )}
        <div className={classes.Fields}>
          <label className={classes.Label}>Address: </label>
          <input
            type="text"
            name="caStreet"
            required
            placeholder="Your Address"
            onChange={(event) => this.handleChange(event)}
            noValidate
          />
          <span className={classes.errorStar}> * </span>
        </div>
        {errors.caStreet.length > 0 && (
          <span className={classes.error}>{errors.caStreet}</span>
        )}
        <div className={classes.Fields}>
          <label className={classes.Label}>Zip Code: </label>
          <input
            type="text"
            name="zip"
            required
            placeholder="Postal Code"
            onChange={(event) => this.handleChange(event)}
            noValidate
          />
          <span className={classes.errorStar}> * </span>
        </div>
        {errors.zip.length > 0 && (
          <span className={classes.error}>{errors.zip}</span>
        )}
        <div className={classes.Fields}>
          <label className={classes.Label}>Shipping: </label>
          <select
            name="deliveryMethod"
            required
            onChange={(event) => this.handleChange(event)}
            noValidate
          >
            <option value="LocalShipping">Local Shipping</option>
            <option value="ups">UPS</option>
            <option value="fastest">Fastest</option>
          </select>
          <span className={classes.errorStar}> *</span>
        </div>
        <Button btnType="Success">Order Now</Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Provide your contact details</h4>

        <Aux>
          <Modal isShow={this.state.showModal} clicked={this.HideModalHandler}>
            {spinnerData}
          </Modal>
          {errorMsg}
          {conactContent}
        </Aux>
      </div>
    );
  }
}

export default ContactData;
