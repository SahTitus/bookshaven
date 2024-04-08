"use client";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isCartSpecsModalOpen, setIsCartSpecsModalOpen] = useState(false);
  
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
        isCartSpecsModalOpen
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateContex = () => useContext(StateContext);
