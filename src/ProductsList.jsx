import React, { useState, useEffect } from "react";
import { ProductsService } from "./Services";

let ProductsList = () => {
  // state
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      let productsResponse = await ProductsService.fetchProducts();
      let productsResponseBody = await productsResponse.json();
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
              autofocus="autofocus"
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
                <tr>#</tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
