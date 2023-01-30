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
          <div className="mt-2">#{prod.brand.brandName}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
