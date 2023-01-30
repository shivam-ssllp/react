import React, { useState, useContext, useEffect } from "react";
import { BrandsService, CategoriesService, ProductsService } from "./Services";
import { UserContext } from "./UserContext";
import Product from "./Product";

let Store = () => {
  // State
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  //get User Context
  let userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      // get brands from db
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      console.log(brandsResponseBody);
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandsResponseBody);

      // get categories from db
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategories(categoriesResponseBody);

      // get Products from db
      let productsResponse = await ProductsService.fetchProducts();
      let productsResponseBody = await productsResponse.json();
      if (productsResponse.ok) {
        productsResponseBody.forEach((product) => {
          // set product
          product.brand = BrandsService.getBrandByBrandId(
            brands,
            product.brandId
          );

          // set category
          product.category = CategoriesService.getCategoryByCategoryId(
            categories,
            product.categoryId
          );
          product.isOrdered = false;
        });
        setProducts(productsResponseBody);
        document.title = "Store - eCommerce";
      }
    })();
  }, []);

  // Update brandIsChecked
  let updateBrandIsChecked = (id) => {
    let brandsData = brands.map((brd) => {
      if (brd.id == id) brd.isChecked = !brd.isChecked;
      return brd;
    });
    setBrands(brandsData);
    console.log(brands);
  };

  // Update categoryIsChecked
  let updateCategoryIsChecked = (id) => {
    let categoriesData = categories.map((cat) => {
      if (cat.id == id) cat.isChecked = !cat.isChecked;
      return cat;
    });
    setCategories(categoriesData);
    console.log(categories);
  };

  return (
    <div>
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>Store</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 py-2">
          {/* For Brands */}
          <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => (
                <li className="list-group-item" key={brand.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={brand.isChecked}
                      onChange={() => {
                        updateBrandIsChecked(brand.id);
                      }}
                      id={`brand${brand.id}`}
                    />
                    <label
                      htmlFor={`brand${brand.id}`}
                      className="form-check-label"
                    >
                      {brand.brandName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* For Categories */}
          <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li className="list-group-item" key={category.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={category.isChecked}
                      onChange={() => {
                        updateCategoryIsChecked(category.id);
                      }}
                      id={`category${category.id}`}
                    />
                    <label
                      htmlFor={`category${category.id}`}
                      className="form-check-label"
                    >
                      {category.categoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-9 py-2">
          <div className="row">
            {products.map((prod) => (
              <Product key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
