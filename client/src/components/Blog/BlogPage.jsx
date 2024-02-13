/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { blogsData } from "./blogData";

const BlogPage = () => {
  const { id } = useParams(); // Get the blog ID from URL parameters
  const blog = blogsData.find(blog => blog.id === parseInt(id)); // Find the blog with the matching ID

  if (!blog) {
    return <div>Blog not found</div>; // Handle case where blog is not found
  }

  const { title, content, imageUrl } = blog;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-semibold text-black mb-4">{title}</h1>
        <img src={imageUrl} alt={title} className="w-full h-auto mb-6 rounded-md" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        <div className="text-lg leading-relaxed">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 font-medium">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
