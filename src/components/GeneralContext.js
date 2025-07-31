import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow"; // ✅ Import Sell window

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, availableQty) => {}, // ✅ Added sell functions
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false); // ✅ Sell window state
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [availableQty, setAvailableQty] = useState(0); // ✅ For checking stock quantity

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid, qty) => {
    setIsSellWindowOpen(true);           // ✅ Open sell window
    setSelectedStockUID(uid);           // ✅ Set UID for selling
    setAvailableQty(qty);               // ✅ Set available quantity
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setAvailableQty(0);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,   // ✅ Added to context
        closeSellWindow: handleCloseSellWindow, // ✅ Added to context
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && (
        <SellActionWindow
          uid={selectedStockUID}
          availableQty={availableQty} // ✅ Pass available quantity
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
