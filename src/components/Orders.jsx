// import React from "react";
// import { Link } from "react-router-dom";

// const Orders = () => {
//   return (
//     <div className="orders">
//       <div className="no-orders">
//         <p>You haven't placed any orders today</p>

//         <Link to={"/"} className="btn">
//           Get started
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders-container">
      <div className="no-orders">
          <p>Place more orders, Here..</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven’t placed any orders today</p>
        </div>
      ) : (
        <>
          <p className="orders-info">Here’s what you did today:</p>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price}</td>
                  <td>₹{(order.qty * order.price).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.mode === "BUY" ? "buyO" : "sellO"}`}>
                      {order.mode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Orders;
