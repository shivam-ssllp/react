import React, { Component } from "react";
// import MainContent from "./mainContent";
import Navbar from "./navbar";
// import ShoppingCart from "./shoppingCart";
import Form from "./form";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Form />
      </React.Fragment>
    );
  }
}
