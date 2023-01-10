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
        photo: "https://source.unsplash.com/random/?boy",
      },
      {
        id: 2,
        name: "Prashant",
        phone: "6392433299",
        address: { city: "Chandanpur" },
        photo: "https://source.unsplash.com/random/?boy",
      },
      {
        id: 3,
        name: "Shivpal",
        phone: "9936121819",
        address: { city: "Balia" },
        photo: "https://source.unsplash.com/random/?man",
      },
      {
        id: 4,
        name: "Kaiwalya",
        phone: null,
        address: { city: "Gorakhpur" },
        photo: "https://source.unsplash.com/random/?boy",
      },
      {
        id: 5,
        name: "Abhishek",
        phone: "",
        address: { city: "Barabanki" },
        photo: "https://source.unsplash.com/random/?man",
      },
      {
        id: 6,
        name: "Mohini",
        phone: "7465846476",
        address: { city: "Lakhimpur" },
        photo: "https://source.unsplash.com/random/?girl",
      },
    ],
  };

  customerNameStyle = (custName) => {
    if (custName.startsWith("S")) return "green-highlight border-end";
    else if (custName.startsWith("M")) return "red-highlight border-start";
    else return "";
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
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>{this.getCustomerRow()}</tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    document.title = "Customers - eCommerce";
  }

  //   Click event
  onRefreshClick = () => {
    // console.log("Event fired");
    this.setState({ customersCount: this.state.customersCount + 2 });
  };

  getPhoneToRender = (phone) => {
    return phone ? phone : <div className="text-danger">No Phone</div>;
  };

  getCustomerRow = () => {
    return this.state.customers.map((cust, index) => {
      return (
        <tr key={cust.id}>
          <td>{cust.id}</td>
          <td className={this.customerNameStyle(cust.name)}>{cust.name}</td>
          <td>{this.getPhoneToRender(cust.phone)}</td>
          <td>{cust.address.city}</td>
          <td>
            {/* <img src="{cust.photo}" alt="Customer"></img> */}
            <img
              src={cust.photo}
              alt="Customer"
              height="60px"
              width="60px"
              className="rounded"
            ></img>
            <div>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  this.onchangePictureClick(cust, index);
                }}
              >
                Change Picture
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  onchangePictureClick = (cust, index) => {
    var custArr = this.state.customers;
    custArr[index].photo = "https://source.unsplash.com/random";
    this.setState({ customers: custArr });
  };
}
