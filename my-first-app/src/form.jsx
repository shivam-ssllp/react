import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }
  render() {
    return (
      <div className="col-lg-9">
        <h4 className="m-1 p-2 border-bottom">Login</h4>

        {/* Email */}
        <div className="form-group form-row col-lg-4 my-3">
          <label className="">Email:</label>
          <input
            type="email"
            className="form-control"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </div>

        {/* Password */}
        <div className="form-group form-row col-lg-4 my-3">
          <label className="">Password:</label>
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>

        {/* Button */}
        {this.state.message}
        <button
          className="btn btn-primary float-end"
          onClick={this.onLoginClick}
        >
          Login
        </button>
      </div>
    );
  }

  onLoginClick = () => {
    console.log(this.state);
    if (
      this.state.email === "shivssk786@gmail.com" &&
      this.state.password === "charlie"
    ) {
      // Success
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });
    } else {
      // Fail
      this.setState({
        message: <span className="text-danger">Login failed</span>,
      });
    }
  };
}
