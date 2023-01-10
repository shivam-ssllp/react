import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }
  render() {
    return (
      <div className="col-lg-9 mx-auto my-5">
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
        <div className="form-group form-row col-lg-4 my-3">
          {this.state.message}
          <button
            className="btn btn-primary float-end"
            onClick={this.onLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    );
  } // End od render

  componentDidMount() {
    document.title = "Login - eCommerce";
  }

  onLoginClick = async (event) => {
    // console.log(this.state);
    // event.preventDefault();

    var response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`
      // `http://localhost:5000/users?email=shivam24@gmail.com&password=joker`
    );
    // console.log(response);
    // console.log(this.state.email);
    // console.log(this.state.password);

    var body = await response.json();
    // console.log(body);
    if (body.length > 0) {
      // Success
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });

      this.props.updateIsLoggedInStatus(true);

      // navigate to homepage
      this.props.history.replace("/dashboard");
    } else {
      // Fail
      this.setState({
        message: <span className="text-danger">Invalid Login Id/password</span>,
      });
    }
  };
}
