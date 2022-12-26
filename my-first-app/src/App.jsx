import React, { Component } from "react";
import MainContent from "./mainContent";
import Navbar from "./navbar";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <MainContent />
      </React.Fragment>  
    );
  }
}
