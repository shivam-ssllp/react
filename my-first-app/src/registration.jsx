import React, { Component } from "react";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      dateOfBirth: "",
      controls: ["email", "password", "fullName", "dateOfBirth"],
      errors: {
        email: [],
        password: [],
        fullName: [],
        dateOfBirth: [],
      },
      message: "",
    };
  }
  render() {
    return (
      <div className="row mt-5">
        <div className="col-lg-6 mx-auto">
          <h1>Register</h1>

          {/* Email column */}
          <div className="form-group form-row row my-3">
            <label className="col-lg-4 col-form-label" htmlFor="email">
              Email
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                id="email"
                className="form-control"
                value={this.state.email}
                onChange={(event) => {
                  this.setState({ email: event.target.value }, this.validate);
                }}
              />
            </div>
          </div>

          {/* Password column */}
          <div className="form-group form-row row my-3">
            <label className="col-lg-4 col-form-label" htmlFor="password">
              Password
            </label>
            <div className="col-lg-8">
              <input
                type="password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={(event) => {
                  this.setState(
                    { password: event.target.value },
                    this.validate
                  );
                }}
              />
            </div>
          </div>

          {/* Full Name column */}
          <div className="form-group form-row row my-3">
            <label className="col-lg-4 col-form-label" htmlFor="fullName">
              Full Name
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                id="fullName"
                className="form-control"
                value={this.state.fullName}
                onChange={(event) => {
                  this.setState(
                    { fullName: event.target.value },
                    this.validate
                  );
                }}
              />
            </div>
          </div>

          {/* Date Of Birth column */}
          <div className="form-group form-row row my-3">
            <label className="col-lg-4 col-form-label" htmlFor="dateOfBirth">
              DOB
            </label>
            <div className="col-lg-8">
              <input
                type="date"
                id="dateOfBirth"
                className="form-control"
                value={this.state.dateOfBirth}
                onChange={(event) => {
                  this.setState(
                    { dateOfBirth: event.target.value },
                    this.validate
                  );
                }}
              />
            </div>
          </div>

          {/* Register Button */}
          <div className="row">
            <div className="col-lg-12">
              <div className="text-right">{this.state.message}</div>
              <div className="text-right float-end">
                <button
                  className="btn btn-success m-2"
                  onClick={this.onRegisterClick}
                >
                  Register
                </button>
              </div>
              <ul className="text-danger">
                {Object.keys(this.state.errors).map((control) => {
                  return this.state.errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  validate = () => {
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
    let errors = {};
    // reading each control from control array
    this.state.controls.forEach((control) => {
      errors[control] = [];
      switch (control) {
        case "email":
          // Email can't be blank
          if (!this.state[control]) {
            errors[control].push("Email Address cannot be blank");
          }

          //   Checking email regex
          if (this.state.email) {
            if (!validEmailRegex.test(this.state[control])) {
              errors[control].push("Enter proper email address");
            }
          }
          break;

        case "password":
          // Password can't be blank
          if (!this.state[control]) {
            errors[control].push("Password cannot be blank");
          }

          //   Checking Password regex
          if (this.state.password) {
            if (!validPasswordRegex.test(this.state[control])) {
              errors[control].push(
                "Password must be 6 to 16 characters long and it must contain one uppercase and one lowercase and one special character"
              );
            }
          }
          break;

        case "fullName":
          // Full Name can't be blank
          if (!this.state[control]) {
            errors[control].push("Full Name cannot be blank");
          }
          break;

        case "dateOfBirth":
          // Date of Birth can't be blank
          if (!this.state[control]) {
            errors[control].push("Date of Birth cannot be blank");
          }

          // Date of Birth should be 18 years or older
          if (this.state[control]) {
            let dob = new Date(this.state[control]).getTime(); // no. of miliseconds of date entered by user
            let today = new Date().getTime(); // no. of miliseconds since 1970-01-01

            if (today - 18 * 365.25 * 24 * 60 * 60 * 1000 < dob) {
              errors[control].push("Age must be 18 years or older");
            }
          }
          break;

        default:
          break;
      }
    });

    // set errors
    this.setState({ errors: errors });
  };

  isValid = () => {
    let valid = true;

    for (let control in this.state.errors) {
      if (this.state.error.length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  onRegisterClick = () => {
    this.validate();

    if (this.isValid() == true) {
      this.setState({ message: "Valid" });
    } else {
      console.log("Not Valid");
    }
  };
}
