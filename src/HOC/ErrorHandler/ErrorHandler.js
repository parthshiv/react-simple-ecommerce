import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Auxilary/Auxilary";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorMsg: null,
    };
    componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({
          errorMsg: null,
        });
        return req;
      });
      axios.interceptors.response.use(null, (error) => {
        this.setState({
          errorMsg: error,
        });
      });
    }
    errorConfirmedHandler = () => {
      this.setState({
        errorMsg: null,
      });
    };
    render() {
      return (
        <Aux>
          <Modal
            isShow={this.state.errorMsg}
            clicked={this.errorConfirmedHandler}
          >
            {this.state.errorMsg ? this.state.errorMsg.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
