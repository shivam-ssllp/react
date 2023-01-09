import React, { Component } from "react";
// import MainContent from "./mainContent";
import Navbar from "./navbar";
import Form from "./form";
import MainContent from "./mainContent";
import Dashboard from "./dashboard";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ShoppingCart from "./shoppingCart";
import PageNotFound from "./pagenotfound";
import history from "./history";
import Sidebar from "./sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <Router history={history}>
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          updateIsLoggedInStatus={this.updateIsLoggedInStatus}
        />

        <div className="row">
          <div className={this.state.isLoggedIn ? "col-lg-3" : ""}>
            {this.state.isLoggedIn ? <Sidebar /> : ""}
          </div>
          <div className="col-lg-9">
            <Routes>
              <Route
                path="/"
                // render={(props) => (
                //   <Form
                //     {...props}
                //     updateIsLoggedInStatus={this.updateIsLoggedInStatus}
                //   />
                // )}
                element={
                  <Form updateIsLoggedInStatus={this.updateIsLoggedInStatus} />
                }
              />
              <Route path="/Form" element={<Form />} exact />
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="/customers" element={<MainContent />} exact />
              <Route path="/cart" element={<ShoppingCart />} exact />
              <Route path="*" element={<PageNotFound />} exact />
            </Routes>
          </div>
        </div>
        {/* <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/customers" exact component={MainContent} />
        <Route path="/cart" exact component={ShoppingCart} /> */}
      </Router>
      // <Form />
    );
  }

  updateIsLoggedInStatus = (stats) => {
    this.setState({ isLoggedIn: stats });
    console.log("updateIsloggedin status function running");
  };
}
