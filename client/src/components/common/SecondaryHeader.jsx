/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SecondaryHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e === "Electric Cars") {
      navigate(`/cars/viewcars/Electric`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-white p-1">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-1">
        <ul className="flex gap-4 text-base font-medium text-[#69696a]">
          <li className="linkStyle">
            <select
              id="newCars"
              name="newCars"
              className="px-4"
              defaultValue="New Cars"
              onChange={(e) => handleClick(e.target.value)}
            >
              <option className="font-normal text-sm" value="New Cars">
                New Cars
              </option>
              <option className="font-normal text-sm" value="Electric Cars">
                Electric Cars
              </option>
            </select>
          </li>
          <Link to="/" className="linkStyle">
            <li title="Currently Unavailable." className="px-4">
              Rentals
            </li>
          </Link>
          <Link to="/blog" className="linkStyle">
            <li className="px-4">Blogs</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
