/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: null,
  loading: false,
  error: false,
};

export const brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {
    fetchBrandStart: (state) => {
      state.loading = true;
    },
    fetchBrandSuccess: (state, action) => {
      state.brands = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchBrandFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  fetchBrandStart,
  fetchBrandFailure,
  fetchBrandSuccess
} = brandSlice.actions;

export default brandSlice.reducer;
