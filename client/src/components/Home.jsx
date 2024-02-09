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

  return (
    <div className="relative w-full h-full">
      <img
        src="https://www.avis.co.in/images/carrental4.webp"
        className="w-full h-auto"
      />
      <div className="absolute top-36 left-20 p-10 leading-10">
        <h1 className="text-5xl font-bold text-white pb-2">
          Buying your dream car?
        </h1>
        <p className="text-white text-3xl">Check Now!!</p>
        <div className="grid grid-cols-2 p-2">
          <select
            id="budget"
            name="budget"
            className="px-6 py-4 rounded-l-lg border border-gray-100 focus:outline-none focus:border-black-500"
            value=""
          >
            <option value="" disabled>
              Select Budget
            </option>
          </select>
          <select
            id="vehical_type"
            name="vehical_type"
            className="px-6 py-4 rounded-tr-lg "
            value=""
          >
            <option value="" disabled>
              All Vehicle Types
            </option>
          </select>
          <div className="flex items-end justify-end col-span-2">
            <button className="mt-1 px-4 py-2 rounded-b-lg font-medium bg-white  hover:bg-gray-200">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
