import React, { useState } from "react";

function Product(props) {
  let [prod] = useState(props.product);
  console.log(prod);
  return (
    <div className="col-lg-6">
      <div className="card m-1">
        <div className="card-body">
          <h5>{prod.productName}</h5>
          <div>${prod.price.toFixed(2)}</div>
          <div className="mt-2">
            {/* #{prod.brand.brandId} #{prod.category.categoryName} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
