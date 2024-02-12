/* eslint-disable no-unused-vars */
// Blogs.js
import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogsData } from "./blogData";

const Blogs = () => {
  return (
    <div className="bg-[#f6f6f6]">
      <div className="mx-auto pb-16 max-w-7xl">
        <h1 className="text-3xl pt-8 font-medium mb-7 text-gray-700">Read our latest blogs on Automobile Industry</h1>
        <div className="flex flex-col gap-8">
          {blogsData.map((blog) => (
              <BlogCard blog={blog} key={blog.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
