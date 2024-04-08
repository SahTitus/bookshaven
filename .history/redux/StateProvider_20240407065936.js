"use client";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isCartSpecsModalOpen, setIsCartSpecsModalOpen] = useState(false);
  
  const toggleShowAuthForm = () => { setShowAuthForm((prev) => !prev) };

  return (
    <StateContext.Provider
      value={{
        showAuthForm,
        setShowAuthForm,
        showLoaderOverlay,
        toggleShowAuthForm,
        setShowLoaderOverlay,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateContex = () => useContext(StateContext);