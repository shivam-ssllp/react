import React, { Component } from "react";
// import MainContent from "./mainContent";
import Navbar from "./navbar";
import Form from "./form";
import MainContent from "./mainContent";
import Dashboard from "./dashboard";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import ShoppingCart from "./shoppingCart";
import PageNotFound from "./pagenotfound";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <Routes>
          <Route
            path="/"
            render={(props) => (
              <Form
                {...props}
                updateIsLoggedInStatus={this.updateIsLoggedInStatus}
              />
            )}
          />
          <Route path="/dashboard" render={() => <Dashboard />} exact />
          <Route path="/customers" element={<MainContent />} exact />
          <Route path="/cart" element={<ShoppingCart />} exact />
          <Route path="*" element={<PageNotFound />} exact />
        </Routes>
        {/* <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/customers" exact component={MainContent} />
        <Route path="/cart" exact component={ShoppingCart} /> */}
      </BrowserRouter>
      // <Form />
    );
  }

  updateIsLoggedInStatus = (stats) => {
    this.setState({ isLoggedIn: stats });
  };
}
