import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-light navbar-style">
          <div className="container-fluid">
            <NavLink className="navbar-brand text-light" to="/">
              My eCommerce
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      aria-cur
                      activeClassName="active"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                ;
                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      to="/dashboard"
                      activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      to="/customers"
                      activeClassName="active"
                    >
                      Customers
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      to="/cart"
                      activeClassName="active"
                    >
                      Cart
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
