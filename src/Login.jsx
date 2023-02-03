import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";

let Login = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  let userContext = useContext(UserContext);
  let myEmailRef = useRef();

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  // Storing errors
  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    document.title = "Login - eCommerce";
    myEmailRef.current.focus();
  });

  let validate = () => {
    // Variable to store errorsData
    let errorsData = {};

    // email
    errorsData.email = [];

    // email can't be blank
    if (!email) {
      errorsData.email.push("Email can't be blank");
    }

    // Email regex
    let validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Enter valid email address");
      }
    }

    // Password
    errorsData.password = [];

    // Password can't be blank
    if (!password) {
      errorsData.password.push("Password can't be blank");
    }

    // Password regex
    let validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password must be 6 to 20 characters long and contain at least 1 numeric digit and 1 uppercase and 1 lowercase character"
        );
      }
    }

    setErrors(errorsData);
  };

  useEffect(validate, [email, password]);

  // When the user clicks on Login Button
  let onLoginClick = async (props) => {
    // Set all controls as dirty
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    // call validate
    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );

      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          userContext.dispatch({ type: "somework", payload: { x: 10, y: 20 } });
          userContext.dispatch({
            type: "login",
            payload: {
              currentUserName: responseBody[0].fullName,
              currentUserId: responseBody[0].id,
              currentUserRole: responseBody[0].role,
            },
          });
          if (responseBody[0].role === "user") {
            window.location.hash = "/dashboard";
          } else {
            window.location.hash = "/products";
          }
          setLoginMessage(
            <span className="text-success">Successfully Logged In</span>
          );
          console.log("Logged in");
        } else {
          setLoginMessage(
            <span className="text-danger">Invalid Login, Please try again</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-danger">Unable to connect to Database</span>
        );
      }
    }
  };

  let isValid = () => {
    let valid = true;

    // Reading all controls from errors
    for (let control in errors) {
      if (errors[control].length > 0) valid = false;
    }

    return valid;
  };

  return (
    <div className="row mt-5">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>
          <div className="card-body border-bottom border-success">
            {/* Email Starts */}
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  console.log(email);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}
                ref={myEmailRef}
              />

              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>

            {/* Password Starts */}
            <div className="form-group my-3">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, password: true });
                  validate();
                }}
              />

              <div className="text-danger">
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{loginMessage}</div>
            <button className="btn btn-success m-2" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
