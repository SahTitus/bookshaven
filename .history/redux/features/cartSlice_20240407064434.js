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
    toggleCartQuantity: (itemId, action) {

      // Check if the item exists in the cart
      if (cart.hasOwnProperty(itemId)) {
        // Get the current quantity of the item
        let currentQuantity = cart[itemId];

        // Perform the action based on the input (increase or decrease)
        if (action === 'increase') {
          currentQuantity++;
        } else if (action === 'decrease') {
          // Ensure the quantity doesn't go below 0
          currentQuantity = Math.max(0, currentQuantity - 1);
        }

        // Update the cart with the new quantity
        cart[itemId] = currentQuantity;

        // If the quantity becomes 0, remove the item from the cart
        if (currentQuantity === 0) {
          delete cart[itemId];
        }
      } else {
        // If the item doesn't exist in the cart and the action is 'increase', add it with a quantity of 1
        if (action === 'increase') {
          cart[itemId] = 1;
        }
      }

      // Return the updated cart
      return cart;
    }



    // clearError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

export const { isLoading, setError, addProductToCart, getUserCart, updateUserCart } =
  cartSlice.actions;
export default cartSlice.reducer;
