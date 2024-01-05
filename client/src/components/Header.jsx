// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-3">
        <Link to="/">
          <h1 className="font-bold">Car Rental</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/signIn">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
