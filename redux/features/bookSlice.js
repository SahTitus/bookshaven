import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
    isLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { userData, isLoading, getUser } =
  bookSlice.actions;
export default bookSlice.reducer;
