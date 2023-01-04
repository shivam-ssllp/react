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
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
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
}
