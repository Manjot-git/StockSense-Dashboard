import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, availableQty }) => {
  const { closeSellWindow } = useContext(GeneralContext);


  console.log("Available Qty for UID", uid, "is", availableQty); // 🔍 Debug this

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");

  const handleSellClick = () => {
    if (stockQuantity > availableQty) {
      setError(`You only have ${availableQty} shares available.`);
      return;
    }

    axios.post("http://localhost:8080/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",
    });

    closeSellWindow();
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container sell" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span style={{ color: "#333" }}>Estimated proceeds ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
