import React, { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrdersService, ProductsService } from "./Services";

// getPreviousOrders
let getPreviousOrders = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === true);
};

// getCart
let getCart = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === false);
};

let Dashboard = () => {
  let [orders, setOrders] = useState([]);

  // get Context
  let userContext = useContext(UserContext);

  // loadDataFromDatabase function that fetches data from 'orders' array from json file
  let loadDataFromDatabase = useCallback(async () => {
    // Load data from Databse
    // Get Orders
    let ordersResponse = await fetch(
      `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
      { method: "GET" }
    );

    if (ordersResponse.ok) {
      // status code is 200
      let ordersResponseBody = await ordersResponse.json();
      console.log(ordersResponseBody);

      // Get Orders
      let productsResponse = await ProductsService.fetchProducts();

      if (productsResponse.ok) {
        // status code is 200
        let productsResponseBody = await productsResponse.json();

        // read all orders data
        ordersResponseBody.forEach((order) => {
          order.product = ProductsService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
          console.log(ordersResponseBody);
        });
        console.log(productsResponseBody);
        setOrders(ordersResponseBody);
      }
    }
  }, [userContext.user.currentUserId]);

  // executes only once - initial render
  useEffect(() => {
    document.title = "Dashboard - eCommerce";

    // Load data from Databse
    loadDataFromDatabase();
  }, [userContext.user.currentUserId, loadDataFromDatabase]);

  // When User clicks Buy Now
  let onBuyNowClick = async (orderId, userId, productId, quantity) => {
    if (window.confirm("Do you want to Place order for this product?")) {
      let updateOrder = {
        id: orderId,
        productId: productId,
        userId: userId,
        quantity: quantity,
        isPaymentCompleted: true,
      };

      let orderResponse = await fetch(
        `http://localhost:5000/orders/${orderId}`,
        {
          method: "PUT",
          body: JSON.stringify(updateOrder),
          headers: { "Content-type": "application/json" },
        }
      );

      let orderResponseBody = await orderResponse.json();
      if (orderResponse.ok) {
        console.log(orderResponseBody);
        loadDataFromDatabase();
      }
    }
  };

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          Dashboard{""}{" "}
          <button
            className="btn btn-sm btn-info"
            onClick={loadDataFromDatabase}
          >
            Refresh
          </button>
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          {/* Previous Orders */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom">
              Previous Orders{" "}
              <span className="badge bg-info">
                {getPreviousOrders(orders).length}
              </span>
            </h4>
            {getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              ""
            )}

            {OrdersService.getPreviousOrders(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                  onBuyNowClick={onBuyNowClick}
                />
              );
            })}
          </div>
          {/* Cart Orders */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom">
              Cart{" "}
              <span className="badge bg-info">{getCart(orders).length}</span>
            </h4>

            {OrdersService.getCart(orders).length === 0 ? (
              <div className="text-danger">No Products in your cart</div>
            ) : (
              ""
            )}

            {OrdersService.getCart(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
