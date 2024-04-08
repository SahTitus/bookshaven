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
    toggleSpecQuantity: (state, action) => {
      const { product_id, spec, change, index } = action.payload;

      const product = state.userCart.products.find((product) => product.id === product_id);

      //return nothing for these conditions
      if (change === -1 && spec.quantity <= 1) return;
      if (change === 1 && product.quantity >= product.stock) return;

      product.specifications[index].quantity += change;
      product.quantity += change;
      state.newSpecValues = {
        quantity: product.specifications[index].quantity,
        spec_id: product.specifications[index].id,
      }
    },
    deleteSpec: (state, action) => {
      const { ids } = action.payload;
      const product = state.userCart.products.find((product) => product.id === ids.product_id);

      if (product) {
        const specIndex = product.specifications.findIndex((spec) => spec.id === ids.spec_id);

        if (specIndex !== -1) {
          product.specifications.splice(specIndex, 1);
        }
      }

    },
    deleteAnObj: (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
    },

    // clearError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

export const { isLoading, setError,addProductToCart, toggleSpecQuantity, getUserCart, updateUserCart, updateSpecQuantity, deleteSpec, deleteAnObj } =
  cartSlice.actions;
export default cartSlice.reducer;
