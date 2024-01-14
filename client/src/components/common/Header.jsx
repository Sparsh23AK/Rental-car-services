/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentuser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-3">
        <Link to="/">
          <h1 className="font-bold">Car Rental</h1>
        </Link>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/sign-in">
            {currentuser ? (<img src={currentuser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover"></img>) : (<li>Sign In</li>)}
          </Link>
        </ul>
      </div>
    </div>
  );
}
