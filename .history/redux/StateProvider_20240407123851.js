"use client";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isCartSpecsModalOpen, setIsCartSpecsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalCartQnty, setTotalCartQnty] = useState(0);
  const [cartBooks, setCartBooks] = useState([])

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(0, prevQuantity + amount));
  };


  const openCartSpecsModal = () => {
    setIsCartSpecsModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartSpecsModalOpen((prev) => !prev);
  };

  const toggleShowAuthForm = () => { setShowAuthForm((prev) => !prev) };

  return (
    <StateContext.Provider
      value={{
        showAuthForm,
        setShowAuthForm,
        showLoaderOverlay,
        toggleShowAuthForm,
        setShowLoaderOverlay,
        openCartSpecsModal,
        closeCartModal,
        isCartSpecsModalOpen,
        handleQuantityChange,
        quantity,
        totalCartQnty, setTotalCartQnty,
        cartBooks, setCartBooks
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateContex = () => useContext(StateContext);
