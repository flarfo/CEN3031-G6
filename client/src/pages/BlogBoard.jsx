import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { toast } from 'react-toastify';

const BlogBoard = ({ posts, setPosts }) => {
  const [newPost, setNewPost] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postTags, setPostTags] = useState('');
  const [postAuthor, setPostAuthor] = useState(''); // State for author
  const [isInputVisible, setInputVisible] = useState(false);

  const navigate = useNavigate();

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
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const handlePostClick = (post) => {
    navigate(`/blog/${post.id}`);
  };

  const handleAddPost = async () => {
    if (newPost.trim() !== '' && postDate !== '' && postTitle.trim() !== '' && postAuthor.trim() !== '') {
      const newPostEntry = {
        id: posts.length + 1,
        title: postTitle,
        text: newPost,
        date: postDate,
        tags: postTags.split(',').map(tag => tag.trim()),
        author: postAuthor, // Include the author in the post data
      };
      setPosts((prevPosts) => [...prevPosts, newPostEntry]);
      setNewPost('');
      setPostTitle('');
      setPostDate('');
      setPostTags('');
      setPostAuthor(''); // Reset the author input
      setInputVisible(false);

      sendPostToServer(newPostEntry);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  const sendPostToServer = async (postData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: postData.id,
          title: postData.title,
          text: postData.text,
          date: postData.date,
          tags: postData.tags,
          author: postData.author, // Include the author when sending to the server
        })
      };

      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error sending post to server');
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      // toast.error("Error posting to server: ", error);
      toast.error(`Error posting to server: ${error.message}`);

    }
  };

  return (
    <div className="blog-board-container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <button className="back-button bg-blue-500 text-white py-2 px-4 rounded" onClick={goBack}>
          Back
        </button>
        <button className="add-post-button bg-green-500 text-white py-2 px-4 rounded" onClick={() => setInputVisible(!isInputVisible)}>
          Add Post
        </button>
      </div>

      {/* Adjusted margin for less space between title and navbar */}
      <h1 className="text-3xl text-center font-bold mb-4">Blog Posts</h1>

      {isInputVisible && (
        <div className="input-container mb-6">
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
              type="text"
              value={postTags}
              onChange={(e) => setPostTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
              className="tags-input border border-gray-300 rounded p-2 w-full"
            />
            <input
              type="text"
              value={postAuthor}
              onChange={(e) => setPostAuthor(e.target.value)}
              placeholder="Enter author name"
              className="author-input border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button className="submit-post-button bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddPost}>
            Submit
          </button>
        </div>
      )}

      {/* Blog Posts Layout */}

      <div className="posts-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="post-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x300" alt="Post" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 text-sm">Posted on: {post.date}</p>
              <p className="text-gray-600 text-sm">By: {post.author}</p> {/* Display the author */}
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