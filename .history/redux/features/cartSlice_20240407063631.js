import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  userCart: {},
  newSpecValues: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getUserCart: (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
    },
    isLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addProductToCart: (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
    },
    updateUserCart: (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
    },


    // clearError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

export const { isLoading, setError,addProductToCart, getUserCart, updateUserCart } =
  cartSlice.actions;
export default cartSlice.reducer;
