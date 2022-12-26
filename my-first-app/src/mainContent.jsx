import React, { Component } from "react";

export default class MainContent extends Component {
  state = { appTitle: "Employees", customersCount: 7 };
  render() {
    return (
      <div>
        <h2 className="text-center">
          {this.state.appTitle}
          <span className="badge bg-secondary">
            {this.state.customersCount}
          </span>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={this.onRefreshClick}
          >
            Refresh
          </button>
        </h2>
      </div>
    );
  }

  //   Click event
  onRefreshClick = () => {
    // console.log("Event fired");
    this.setState({ customersCount: this.state.customersCount + 22 });
  };
}
