import React, { Component } from "react";
import Product from "./product";

export default class ShoppingCart extends Component {
  state = {
    products: [
      { id: 1, productName: "iPhone", price: 8900, quantity: 0 },
      { id: 2, productName: "Samsung LED Tv", price: 877, quantity: 0 },
      { id: 3, productName: "Sony Camera", price: 7745, quantity: 0 },
      { id: 4, productName: "iPad Pro", price: 7373, quantity: 0 },
      { id: 5, productName: "Xbox", price: 8373, quantity: 0 },
      { id: 6, productName: "Dell Monitor", price: 8737, quantity: 0 },
    ],
  };
  render() {
    return (
      <div className="container-fluid">
        <h4>Shopping Cart</h4>
        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
              >
                <button className="btn btn-secondary">Buy now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }

  // render method ends here
  handleIncrement = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    allProducts[index].quantity++;

    this.setState({ products: allProducts });
  };

  handleDecrement = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (this.state.products.quantity > 1) {
      allProducts[index].quantity--;
    }

    this.setState({ products: allProducts });
  };
}
