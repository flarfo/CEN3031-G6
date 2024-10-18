import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost'; 
import { toast } from 'react-toastify';

const BlogBoard = ({posts, setPosts}) => {
  const [newPost, setNewPost] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postColor, setPostColor] = useState('#ffeb3b');
  const [isInputVisible, setInputVisible] = useState(false);
  
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  const handlePostClick = (post) => {
    navigate(`/blog/${post.id}`); // Correctly using the post ID
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '' && postDate !== '' && postTitle.trim() !== '') {
      const newPostEntry = { 
        id: posts.length, // Use the current length of the posts array as ID
        title: postTitle, 
        text: newPost, 
        date: postDate, 
        color: postColor 
      };
      setPosts((prevPosts) => [...prevPosts, newPostEntry]);
      setNewPost('');
      setPostTitle('');
      setPostDate('');
      setPostColor('#ffeb3b');
      setInputVisible(false);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  return (
    <div className="blog-board-container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="back-button bg-blue-500 text-white py-2 px-4 rounded" onClick={goBack}>
          Back
        </button>
        <button className="add-post-button bg-green-500 text-white py-2 px-4 rounded" onClick={() => setInputVisible(!isInputVisible)}>
          Add Post
        </button>
      </div>
      <h1 className="text-3xl text-center font-bold mb-6">Blog Posts</h1>

      {isInputVisible && (
        <div className="input-container mb-4">
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Post Title"
            className="post-title-input border border-gray-300 rounded p-2 mb-2 w-full"
          />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a post..."
            rows="4"
            className="post-input border border-gray-300 rounded p-2 w-full"
          />
          <div className="post-options flex space-x-2 mb-2">
            <input
              type="date"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              className="date-input border border-gray-300 rounded p-2 w-full"
            />
            <input
              type="color"
              value={postColor}
              onChange={(e) => setPostColor(e.target.value)}
              className="color-input border border-gray-300 rounded p-2"
            />
          </div>
          <button className="submit-post-button bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddPost}>
            Submit
          </button>
        </div>
      )}

      <div className="posts-container">
        {posts.map((post, index) => (
          <BlogPost key={index} post={post} onClick={() => handlePostClick(post)} />
        ))}
      </div>
    </div>
  );
};

export default BlogBoard;
