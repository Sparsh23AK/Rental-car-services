/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import classNames from "classnames";

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex gap-2">
        {pages.map((page) => (
          <li
            key={page}
            className={classNames(
              "px-3 py-1 rounded cursor-pointer",
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
