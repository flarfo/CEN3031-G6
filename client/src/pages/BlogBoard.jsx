import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import BlogPost from '../components/BlogPost';

const BlogBoard = ({ posts, setPosts, user }) => {
  const navigate = useNavigate();
  
  // Ensure user is logged in before allowing to add post
  const handleAddPost = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/add-post');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  const handlePostClick = (post) => {
    navigate(`/blog/${post.id}`);
  };

  // GET request to server, update posts array on completion
  useEffect(() => {
    const getExistingPosts = async () => {
      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, requestOptions);
        const data = await response.json();
        if (!data.length) return;

        data.forEach((post, i) => {
          data[i] = {
            id: i,
            title: post.title || 'Untitled Post',
            text: post.text || 'No description available',
            date: post.date || 'Unknown Date',
            tags: post.tags || [],
            author: post.author || 'Anonymous', // Default to 'Anonymous' if no author
          };
        });

        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getExistingPosts();
  }, [setPosts]);

  return (
    <div className="blog-board-container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <button className="back-button bg-blue-500 text-white py-2 px-4 rounded" onClick={goBack}>
          Back
        </button>
        <button className="add-post-button bg-green-500 text-white py-2 px-4 rounded" onClick={handleAddPost}>
          Add Post
        </button>
      </div>

      <h1 className="text-3xl text-center font-bold mb-4">Blog Posts</h1>

      {/* Blog Posts Layout */}

      <div className="posts-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="post-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x300" alt="Post" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 text-sm">Posted on: {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <p className="text-gray-600 text-sm">By: {post.author}</p>
              <p className="text-gray-700 mt-2">{post.text.slice(0, 100)}...</p>
              <div className="tags mt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2">{tag}</span>
                ))}
              </div>
              <button className="read-more mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handlePostClick(post)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default BlogBoard;
