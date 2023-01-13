import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import isLoggedInStatus from "./Session";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-light navbar-style">
          <div className="container-fluid">
            <a
              className="navbar-brand text-light"
              href="/#"
              onClick={this.onlogoutClick}
            >
              My eCommerce
            </a>
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
                {/* Login */}
                {!isLoggedInStatus ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      aria-cur
                      activeClassName="active"
                      to="/"
                    >
                      Login
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {/* Register */}
                {!this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      aria-cur
                      activeClassName="active"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {/* Dashboard */}
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

                {/* Customers */}
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

                {/* Cart */}
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

                {/* Logout */}
                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <a
                      className="nav-link text-light"
                      href="/#"
                      onClick={this.onlogoutClick}
                    >
                      Logout
                    </a>
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

  onlogoutClick = (event) => {
    event.preventDefault();
    this.props.updateIsLoggedInStatus(false);

    document.location.hash("/");
  };
}

export default NavBar;
