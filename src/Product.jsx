import React, { useState } from "react";

function Product(props) {
  console.log(props);
  let [prod] = useState(props.product);
  return (
    <div className="col-lg-6">
      <div className="card m-1">
        <div className="card-body">
          <h5>{prod.productName}</h5>
          <div>${prod.price.toFixed(2)}</div>
          <div className="mt-1 text-muted">
            #{prod.brand.brandName}&nbsp; #{prod.category.categoryName}
          </div>
          <div>
            {/* {[...Array(prod.rating).keys()].map((n) => {
              return <div>Rating{n}</div>;
            })} */}
            Rating {prod.rating}
          </div>
          <div className="float-end">
            {prod.isOrdered ? (
              <span className="text-primary">Added to Cart</span>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  props.onAddToCartClick(prod);
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
