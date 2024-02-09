/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import myImage from "../../assets/carental.png";

export default function SecondaryHeader() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white p-1 ">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-1">
        <ul className="flex gap-4 text-lg font-medium text-[#69696a]">
          <Link to="/">
            <li>
              <select
                id="newCars"
                name="newCars"
                className="px-4"
                value="New Cars"
              >
                <option className="font-normal text-sm" value="New Cars">
                  New Cars
                </option>
                <option className="font-normal text-sm" value="Electric Cars">
                  Electric Cars
                </option>
              </select>
            </li>
          </Link>
          <Link to="/">
            <li className="px-4">Rentals</li>
          </Link>
          <Link to="/">
            <li className="px-4">Blogs</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
