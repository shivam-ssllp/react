import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

let Register = () => {
  let [state, setState] = useState({
    email: "shivam24@gmail.com",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: "",
  });

  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "Japan" },
    { id: 5, countryName: "France" },
    { id: 6, countryName: "Brazil" },
    { id: 7, countryName: "Mexico" },
    { id: 8, countryName: "Canada" },
  ]);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetters: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetters: false,
  });

  let [message, setMessage] = useState("");

  // Validate
  let validate = () => {
    let errorsData = {};

    // email
    errorsData.email = [];

    // Email can't be blank
    if (!state.email) {
      errorsData.email.push("Email can't be blank");
    }

    // email Regex
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Please enter a Valid Email Address");
      }
    }

    // Password
    errorsData.password = [];

    // Password can't be blank
    if (!state.password) {
      errorsData.password.push("Password can't be blank");
    }

    // Password Regex
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password must be 6 to 20 characters long and contain at least 1 numeric digit and 1 uppercase and 1 lowercase character"
        );
      }
    }

    // Full Name
    errorsData.fullName = [];

    // Full Name can't be blank
    if (!state.fullName) {
      errorsData.fullName.push("full Name can't be blank");
    }

    // Date of Birth
    errorsData.dateOfBirth = [];

    // Date of Birth can't be blank
    if (!state.dateOfBirth) {
      errorsData.dateOfBirth.push("Date of Birth is required");
    }

    // Gender
    errorsData.gender = [];

    // Gender can't be blank
    if (!state.gender) {
      errorsData.gender.push("Must specify gender");
    }

    // Country
    errorsData.country = [];

    // Country can't be blank
    if (!state.country) {
      errorsData.country.push("Please select a country");
    }

    setErrors(errorsData);
  };

  useEffect(validate, [state]);

  // Executes only once - on initial render - componentDidMount
  useEffect(() => {
    document.title = "Register - eCommerce";
  }, []);

  let userContext = useContext(UserContext);

  let onRegisterClick = async (props) => {
    // Set all controls as dirty
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      setMessage(<span className="text-success">Success</span>);

      let response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dateOfBirth: state.dateOfBirth,
          gender: state.gender,
          country: state.country,
          receiveNewsLetters: state.receiveNewsLetters,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        let responseBody = await response.json();
        userContext.setUser({
          ...userContext.user,
          isLoggedIn: true,
          currentUserName: responseBody.fullName,
          currentUserId: responseBody.id,
        });
        window.location.hash = "/dashboard";
        setMessage(
          <span className="text-success">Successfully Registered</span>
        );
        props.history.replace("/dashboard");
      } else {
        setMessage(
          <span className="text-danger">Error in Database Connection</span>
        );
      }
    } else {
      setMessage(<span className="text-danger">Errors</span>);
    }
  };

  let isValid = () => {
    let valid = true;

    // reading all controls from 'errors' state
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

  return (
    <div className="row mt-5">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-center text-primary"
            >
              Register
            </h4>
          </div>
        </div>

        <ul className="text-danger">
          {Object.keys(errors).map((control) => {
            if (dirty[control]) {
              return errors[control].map((err) => {
                return <li key={err}>{err}</li>;
              });
            } else {
              return "";
            }
          })}
        </ul>

        <div className="card-body border-bottom border-primary">
          {/* Email Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="email" className="col-lg-4">
              Email
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                value={state.email}
                onChange={(event) => {
                  setState({
                    ...state,
                    [event.target.name]: event.target.value,
                  });
                  console.log(state.email);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />

              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>
          </div>
          {/* Email Ends */}

          {/* Password Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="password" className="col-lg-4">
              Password
            </label>
            <div className="col-lg-8">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={state.password}
                onChange={(event) => {
                  setState({
                    ...state,
                    [event.target.name]: event.target.value,
                  });
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
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
          {/* Password Ends */}

          {/* FullName Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="fullName" className="col-lg-4">
              Full Name
            </label>
            <div className="col-lg-8">
              <input
                type="name"
                name="fullName"
                id="fullName"
                className="form-control"
                value={state.fullName}
                onChange={(event) => {
                  setState({
                    ...state,
                    [event.target.name]: event.target.value,
                  });
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />

              <div className="text-danger">
                {dirty["fullName"] && errors["fullName"][0]
                  ? errors["fullName"]
                  : ""}
              </div>
            </div>
          </div>
          {/* FullName Ends */}

          {/* Date Of Birth Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="dateOfBirth" className="col-lg-4">
              Date of Birth
            </label>
            <div className="col-lg-8">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-control"
                value={state.dateOfBirth}
                onChange={(event) => {
                  setState({
                    ...state,
                    [event.target.name]: event.target.value,
                  });
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />

              <div className="text-danger">
                {dirty["dateOfBirth"] && errors["dateOfBirth"][0]
                  ? errors["dateOfBirth"]
                  : ""}
              </div>
            </div>
          </div>
          {/* Date Of Birth Ends */}

          {/* Country Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="country" className="col-lg-4">
              Country
            </label>
            <div className="col-lg-8">
              <select
                name="country"
                id="country"
                className="form-control"
                value={state.country}
                onChange={(event) => {
                  setState({
                    ...state,
                    [event.target.name]: event.target.value,
                  });
                  console.log(state.country);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              >
                <option value="">Please select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
              </select>

              <div className="text-danger">
                {dirty["country"] && errors["country"][0]
                  ? errors["country"]
                  : ""}
              </div>
            </div>
          </div>
          {/* Country Ends */}

          {/* Gender Starts */}
          <div className="form-group form-row row my-3">
            <label htmlFor="gender" className="col-lg-4">
              Gender
            </label>
            <div className="col-lg-8">
              {/* For Male */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={state.gender === "male" ? true : false}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <label htmlFor="male" className="form-check-inline">
                  Male
                </label>
              </div>

              {/* For Female */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  // checked={state.gender === "male" ? true : false}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                />

                <label htmlFor="female" className="form-check-inline">
                  Female
                </label>
              </div>

              <div className="text-danger">
                {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
              </div>
            </div>
          </div>
          {/* Gender Ends */}

          {/* ReceiveNewsLetters  Starts */}
          <div className="form-group form-row row my-3">
            <div className="col-lg-8">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="receiveNewsLetters"
                  id="receiveNewsLetters"
                  value="true"
                  checked={state.receiveNewsLetters === true ? true : false}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.checked,
                    });
                  }}
                />

                <label
                  htmlFor="receiveNewsLetters"
                  className="form-check-inline"
                >
                  Receive Newsletters
                </label>
              </div>
            </div>
          </div>
          {/* ReceiveNewsLetters  Ends */}
        </div>

        <div className="card-footer text-center">
          <div className="m-1">{message}</div>
          <div>
            <button className="btn btn-primary m-2" onClick={onRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
