import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../HOC/Auxilary/Auxilary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // this will prevent the unnecessory re-rendering of ordersummary component because we only need to re-render the ordersummary component when modal is showned.

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isShow !== this.props.isShow ||
      nextProps.children !== this.props.children
    );
  }

  // below will only called when Modal is showned
  // componentWillUpdate() {
  //   //console.log("Modal will update"); // this will
  // }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.isShow} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.isShow
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.isShow ? "1" : "0",
          }}
        >
          <button className={classes.closeButton} onClick={this.props.clicked}>
            X
          </button>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
