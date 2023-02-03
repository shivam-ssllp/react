import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import {
  BrandsService,
  ProductsService,
  CategoriesService,
  SortService,
} from "./Services";

let ProductsList = () => {
  // state
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  let [originalProducts, setOriginalProducts] = useState([]);
  let [sortBy, setSortBy] = useState("productName");
  let [sortOrder, setSortOrder] = useState("ASC"); // ASC or DESC
  let [brands, setBrands] = useState([]); // ASC or DESC
  let [selectedBrand, setSelectedBrand] = useState(""); // ASC or DESC

  useEffect(() => {
    (async () => {
      // request to brands table
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      setBrands(brandsResponseBody);

      // request to categories table
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      // request to product table
      let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,
        { method: "GET" }
      );
      let productsResponseBody = await productsResponse.json();

      // Set category property into each product
      productsResponseBody.forEach((product) => {
        product.category = CategoriesService.getCategoryByCategoryId(
          categoriesResponseBody,
          product.categoryId
        );
      });

      // Set product property into each product
      productsResponseBody.forEach((product) => {
        product.brand = ProductsService.getProductByProductId(
          brandsResponseBody,
          product.brandId
        );
      });
      setProducts(productsResponseBody);
      setOriginalProducts(productsResponseBody);
    })();
  }, [search]);

  let filteredProducts = useMemo(() => {
    console.log("filteredProducts", originalProducts, selectedBrand);
    return originalProducts.filter(
      (prod) => prod.brand.brandName.indexOf(selectedBrand) >= 0
    );
  }, [originalProducts, selectedBrand]);

  // When user clicks on a column name to sort
  let onSortColumnNameClick = (event, columnName) => {
    event.preventDefault(); //avoid refresh
    setSortBy(columnName);
    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
  };

  // useEffect - Executes on each change of filteredBrands, sortBy, sortOrder
  useEffect(() => {
    setProducts(
      SortService.getSortedArray(filteredProducts, sortBy, sortOrder)
    );
  }, [filteredProducts, sortBy, sortOrder]);

  // render column name
  let getColumnHeader = (columnName, displayName) => {
    return (
      <React.Fragment>
        <a
          href="/#"
          onClick={(event) => {
            onSortColumnNameClick(event, columnName);
          }}
        >
          {displayName}
        </a>{" "}
        {sortBy === columnName && sortOrder === "ASC" ? "up" : ""}
        {sortBy === columnName && sortOrder === "DESC" ? "down" : ""}
      </React.Fragment>
    );
  };

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
          <div className="col-lg-6">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              autoFocus="autoFocus"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          <div className="col-lg-3">
            <select
              className="form-control"
              value={selectedBrand}
              onChange={(event) => {
                setSelectedBrand(event.target.value);
              }}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option value={brand.brandName} key={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>{getColumnHeader("productName", "Product Name")}</th>
                  <th>{getColumnHeader("price", "Price")}</th>
                  <th>{getColumnHeader("brand", "Brand")}</th>
                  <th>{getColumnHeader("category", "Category")}</th>
                  <th>{getColumnHeader("rating", "Rating")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.brandName}</td>
                    <td>{product.category.categoryName}</td>
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
