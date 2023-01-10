import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: this.props.product };
  }

  render() {
    return (
      <div className="col-lg-4">
        <div className="card m-2">
          <div className="card-body">
            <div className="text-muted mb-1">
              #{this.state.product.id}
              <span
                className="pull-right hand-icon"
                onClick={() => {
                  this.props.onDelete(this.state.product);
                }}
              >
                <i className="fa fa-times"></i>
              </span>
            </div>
            <h5 className="pt-5 border-top">
              {this.state.product.productName}
            </h5>
            <div>${this.state.product.price}</div>
            <div className="card-footer">
              <div className="float-start">
                <span className="badge text-dark">
                  {this.state.product.quantity}
                </span>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      this.props.onIncrement(this.state.product, 10);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      this.props.onDecrement(this.state.product, 0);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="float-end">
                <Link to={`/product/${this.state.product.id}`} className="me-2">
                  Details
                </Link>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // document.title = "Dashboard - eCommerce";
  }
}
