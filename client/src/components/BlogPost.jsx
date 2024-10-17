import React from 'react';
import '../BlogBoard.css'; // Import CSS file for styling

const BlogPost = ({ post }) => {
  return (
    <div className="post-it-note" style={{ backgroundColor: post.color }}>
      <div className="post-date">{post.date}</div>
      <p>{post.text}</p>
    </div>
  );
};

export default BlogPost;
