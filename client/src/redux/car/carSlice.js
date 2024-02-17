/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: null,
  loading: false,
  error: false,
};

export const carSlice = createSlice({
  name: "carSlice",
  initialState,
  reducers: {
    fetchCarsStart: (state) => {
      state.loading = true;
    },
    fetchCarsSuccess: (state, action) => {
      state.cars = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchCarsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  fetchCarsStart,
  fetchCarsFailure,
  fetchCarsSuccess
} = carSlice.actions;

export default carSlice.reducer;
