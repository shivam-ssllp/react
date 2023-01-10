import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return <h2 className="text-center my-5 fs-1">I am Dashboard</h2>;
  }

  componentDidMount() {
    document.title = "Dashboard - eCommerce";
  }
}
