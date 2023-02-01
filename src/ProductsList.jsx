import React, { useState, useEffect } from "react";
import { BrandsService, ProductsService, CategoriesServices } from "./Services";

let ProductsList = () => {
  // state
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      // request to brands table
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();

      // request to brands table
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      // request to product table
      let productsResponse = await ProductsService.fetchProducts();
      let productsResponseBody = await productsResponse.json();

      // Set category property into each product
      productsResponseBody.forEach((product) => {
        product.category = categoriesServices.getCategoryByCategoryId(
          categoriesResponseBody,
          product.categoryId
        );
      });
      setProducts(productsResponseBody);
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h2>
              Products&nbsp;
              <span className="badge bg-secondary">{products.length}</span>
            </h2>
          </div>
          <div className="col-lg-9">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              autoFocus="autofocus"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.brandId}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
