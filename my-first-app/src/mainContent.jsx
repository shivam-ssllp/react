import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTitle: "Employees",
      customersCount: 7,
      customers: [],
    };
  }

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
          <Link
            to="/new-customer"
            type="button"
            className="btn btn-primary ms-2"
          >
            New Customer
          </Link>
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

  componentDidMount = async () => {
    document.title = "Customers - eCommerce";

    // 'get' request/ customers
    let response = await fetch("http://localhost:5000/customers", {
      method: "GET",
    });

    let body = await response.json();
    console.log(body);
    this.setState({ customers: body });
    console.log("mounted");
  };

  getPhoneToRender = (phone) => {
    return phone ? phone : <div className="text-danger">No Phone</div>;
  };

  getCustomerRow = () => {
    console.log("getting cx data" + this.state.customers);
    return this.state.customers.map((cust, index) => {
      console.log(
        cust.id,
        cust.name,
        cust.phone,
        cust.address.city,
        cust.photo
      );
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
