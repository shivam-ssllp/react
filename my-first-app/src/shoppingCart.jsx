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
                onDelete={this.handleDelete}
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
  handleIncrement = (product, maxValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;

      this.setState({ products: allProducts });
    }
  };

  handleDecrement = (product, minValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;
    }

    this.setState({ products: allProducts });
  };

  handleDelete = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you Sure ??")) {
      allProducts.splice(index, 1);

      this.setState({ products: allProducts });
    }
  };
}
