import React, { Component } from "react";

export default class MainContent extends Component {
  state = {
    appTitle: "Employees",
    customersCount: 7,
    customers: [
      {
        id: 1,
        name: "Shivam",
        phone: "7860345351",
        address: { city: "Lucknow" },
      },
      {
        id: 2,
        name: "Prashant",
        phone: "6392433299",
        address: { city: "Chandanpur" },
      },
      {
        id: 3,
        name: "Shivpal",
        phone: "9936121819",
        address: { city: "Balia" },
      },
      {
        id: 4,
        name: "Kaiwalya",
        phone: null,
        address: { city: "Gorakhpur" },
      },
      {
        id: 5,
        name: "Abhishek",
        phone: "",
        address: { city: "Barabanki" },
      },
    ],
  };
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
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((cust) => {
              return (
                <tr key={cust.id}>
                  <td>{cust.id}</td>
                  <td>{cust.name}</td>
                  <td>
                    {cust.phone ? (
                      cust.phone
                    ) : (
                      <div className="text-danger">No Phone</div>
                    )}
                  </td>
                  <td>{cust.address.city}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  //   Click event
  onRefreshClick = () => {
    // console.log("Event fired");
    this.setState({ customersCount: this.state.customersCount + 2 });
  };
}
