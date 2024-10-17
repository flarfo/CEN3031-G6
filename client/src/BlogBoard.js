import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogBoard.css'; // Import CSS file for styling

const BlogBoard = () => {
  const [posts, setPosts] = useState([]); // State to hold the list of posts
  const [newPost, setNewPost] = useState(''); // State to hold the new post input
  const [postDate, setPostDate] = useState(''); // State for the post date
  const [postColor, setPostColor] = useState('#ffeb3b'); // State for the post color
  const [isInputVisible, setInputVisible] = useState(false); // State to control the visibility of the text area

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/'); // Navigate back to the Home page
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '' && postDate !== '') {
      const newPostEntry = { text: newPost, date: postDate, color: postColor };
      setPosts([...posts, newPostEntry]); // Add the new post to the list
      setNewPost(''); // Clear the input field
      setPostDate(''); // Clear the date field
      setPostColor('#ffeb3b'); // Reset the color to default
      setInputVisible(false); // Hide the input after adding the post
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
            <div key={index} className="post-it-note" style={{ backgroundColor: post.color }}>
              <div className="post-date">{post.date}</div> {/* Date in the top left corner */}
              <p>{post.text}</p> {/* Centered post content */}
            </div>
          ))}
        </div>

    </div>
  );
};

export default BlogBoard;
