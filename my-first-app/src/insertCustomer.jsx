import React, { Component } from "react";

export default class NewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "", name: "", city: "", photo: "", phone: "" };
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <form action="">
            <h2 className=" p-2 border-bottom">Register</h2>
            {/* Customer Name */}
            <div className="form-group form-row">
              <label className="col-lg-4">Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(event) => {
                    this.setState({ name: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* Customer City */}
            <div className="form-group form-row">
              <label className="col-lg-4">City</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.city}
                  onChange={(event) => {
                    this.setState({ city: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* Customer Phone number */}
            <div className="form-group form-row">
              <label className="col-lg-4">Phone Number</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phone}
                  onChange={(event) => {
                    this.setState({ phone: event.target.value });
                  }}
                />
              </div>
            </div>
            {/* Customer Photo */}
            <div className="form-group form-row">
              <label className="col-lg-4">Photo</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.photo}
                  onChange={(event) => {
                    this.setState({ photo: event.target.value });
                  }}
                />
              </div>
            </div>

            {/* Submit Registration form */}
            <div className="border-top p-2">
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.onSaveClick}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  //   On clicking Save button
  onSaveClick = async (event) => {
    event.preventDefault();
    console.log("On Save click running");
    var customer = {
      name: this.state.name,
      address: { city: this.state.city },
      phone: this.state.phone,
      photo: this.state.photo,
    };

    var response = fetch("http://localhost:5000/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      var body = await response.json();
      console.log(body);
      this.props.history.replace("/customer");
      // window.alert("Customer registered.");
    } else {
      console.log("Error" + response.ok);
    }
  };
}
