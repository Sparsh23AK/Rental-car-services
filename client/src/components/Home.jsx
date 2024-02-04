/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandFailure,
  fetchBrandStart,
  fetchBrandSuccess,
} from "../redux/car/brandSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBrands(); // Initial data fetch when the component mounts
  }, []);

  const fetchBrands = async () => {
    try {
      dispatch(fetchBrandStart());
      const response = await fetch("/api/cars/getBrands");
      const data = await response.json();
      if (data.success === false) {
        dispatch(fetchBrandFailure(data));
        return;
      }
      dispatch(fetchBrandSuccess(data));
    } catch (error) {
      dispatch(fetchBrandFailure(error));
    }
  };
  return <div>Home</div>;
}
