/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { blogsData } from "./blogData";

const BlogPage = () => {
  const { id } = useParams(); // Get the blog ID from URL parameters
  const blog = blogsData.find(blog => blog.id === parseInt(id)); // Find the blog with the matching ID
  console.log(blog);

  if (!blog) {
    return <div>Blog not found</div>; // Handle case where blog is not found
  }

  const { title, content, imageUrl } = blog;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <img src={imageUrl} alt={title} className="w-full mb-4" />
      <div className="text-lg leading-relaxed">
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
