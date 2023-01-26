import React from "react";

let Order = (props) => {
  console.log("rendered", props);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          {props.productName}
          {props.isPaymentCompleted === false ? (
            <div className="float-end">
              <button
                className="btn btn-sm btn-info mx-1"
                onClick={() => {
                  props.onBuyNowClick(
                    props.orderId,
                    props.userId,
                    props.productId,
                    props.quantity
                  );
                }}
              >
                Buy Now
              </button>
              <button
                className="btn btn-sm btn-danger mx-1"
                onClick={() => {
                  props.onDeleteClick(props.orderId);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </h6>

        <table className="table table-sm table-borderless mt-1">
          <tbody>
            <tr>
              <td style={{ width: "100px" }}>Quantity:</td>
              <td>{props.quantity}</td>
            </tr>
            <tr>
              <td style={{ width: "100px" }}>Price:</td>
              <td>{props.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Order);
