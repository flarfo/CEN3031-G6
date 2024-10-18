import React from 'react';

const BlogPost = ({ post, onClick }) => {
  return (
    <div 
      className="max-w-md bg-white shadow-md rounded p-4 mb-4 cursor-pointer"
      style={{ backgroundColor: post.color }} 
      onClick={onClick} 
    >
      <h2 className="post-title font-semibold text-lg">{post.title}</h2>
      <div className="post-date text-gray-500">{post.date}</div>
      <p className="post-text">{post.text}</p>
    </div>
  );
};

export default BlogPost;
