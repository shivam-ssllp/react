import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

let Navbar = () => {
  // userContext
  let userContext = useContext(UserContext);

  let onLogoutClick = (event) => {
    event.preventDefault();

    userContext.setUser({
      isLoggedIn: false,
      currentUserId: null,
      currentUserName: null,
    });

    window.location.hash = "/";
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-style bg-dark px-2">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/dashboard">
            eCommerce
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userContext.user.isLoggedIn ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/dashboard"
                    activeclassname="active"
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {!userContext.user.isLoggedIn ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" activeclassname="active">
                    Login
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {!userContext.user.isLoggedIn ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>

            {/* Right Box */}
            {userContext.user.isLoggedIn ? (
              <div style={{ marginRight: 100 }} className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="/#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userContext.user.currentUserName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="/#"
                        onClick={onLogoutClick}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
