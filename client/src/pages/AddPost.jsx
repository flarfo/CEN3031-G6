import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';

const AddPost = ({ user, setPosts, posts }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('');
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 600 / 300 });
  const [croppedImage, setCroppedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCropComplete = (crop, percentCrop) => {
    // You can optionally handle cropping complete actions here
    setCrop(crop);
  };

  const handleAddPost = async () => {
    if (!postTitle || !postContent) {
      toast.error('Title and content are required.');
      return;
    }

    const newPost = {
      id: posts.length,
      title: postTitle,
      text: postContent,
      date: new Date().toISOString().slice(0, 10),
      tags: postTags.split(',').map(tag => tag.trim()),
      author: user?.username || 'Anonymous', // Set author to the current user
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        toast.success('Post added successfully!');
        navigate('/blog-board');
      } else {
        toast.error('Failed to add post.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the post.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-post-container p-6 bg-white rounded shadow-lg mx-auto max-w-2xl">
      <h2 className="text-3xl font-bold text-center mb-4">Add a New Blog Post</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Post Title</label>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className="mt-1 p-3 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Post Content</label>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows="6"
          className="mt-1 p-3 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input
          type="text"
          value={postTags}
          onChange={(e) => setPostTags(e.target.value)}
          className="mt-1 p-3 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Header Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
        {image && (
          <ReactCrop
            src={image}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
          />
        )}
      </div>
      <button
        onClick={handleAddPost}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
