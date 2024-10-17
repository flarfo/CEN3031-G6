import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost'; // Import the BlogPost component
import '../BlogBoard.css';

const BlogBoard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postColor, setPostColor] = useState('#ffeb3b');
  const [isInputVisible, setInputVisible] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '' && postDate !== '') {
      const newPostEntry = { text: newPost, date: postDate, color: postColor };
      setPosts([...posts, newPostEntry]);
      setNewPost('');
      setPostDate('');
      setPostColor('#ffeb3b');
      setInputVisible(false);
    }
  };

  return (
    <div className="blog-board-container">
      <button className="back-button" onClick={goBack}>
        Back
      </button>
      <h1>Bulletin Board</h1>
      <button className="add-post-button" onClick={() => setInputVisible(!isInputVisible)}>
        Add Post
      </button>

      {isInputVisible && (
        <div className="input-container">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a post..."
            rows="4"
            className="post-input"
          />
          <div className="post-options">
            <input
              type="date"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              className="date-input"
            />
            <input
              type="color"
              value={postColor}
              onChange={(e) => setPostColor(e.target.value)}
              className="color-input"
            />
          </div>
          <button className="submit-post-button" onClick={handleAddPost}>
            Submit
          </button>
        </div>
      )}

      <div className="posts-container">
        {posts.map((post, index) => (
          <BlogPost key={index} post={post} /> // Use BlogPost component
        ))}
      </div>
    </div>
  );
};

export default BlogBoard;
