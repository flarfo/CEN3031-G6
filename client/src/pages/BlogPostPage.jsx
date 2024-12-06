import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogPostPage = ({ user, posts, setPosts }) => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();

  // Find the specific post using the ID from the params
  const post = posts.find((p) => p.id === parseInt(id));

  // Handle the case when no post is found
  if (!post) {
    return <div className="text-center mt-10 text-red-500">Post not found.</div>;
  }

  // Format the date as "Month Day, Year"
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Navigate back to the blog board
  const goBack = () => {
    navigate('/blog-board');
  };

  // Delete the current blog post
  // const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, requestOptions);
  const deletePost = async () => {
    if (user?.username !== post.author){
      console.log('You are not the post author.')
      toast.error('You are not the post author.')
      return;
    }

    try {
      // Send a DELETE request to the backend to delete the post
      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id }),  // Send the event ID in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }

      // If successful, remove the post from the state
      setPosts(posts.filter((p) => p.id !== post.id));
    
      // Navigate back to the blog board
      navigate('/blog-board');

  } catch (error) {
    console.error('Error deleting post:', error);
    // alert('There was an error deleting the post. Please try again later.', error);
    alert(error);
  }
  };

  // Render the buttons (Back and Delete)
  const renderButtons = () => (
    <div className='flex space-x-2 mb-6'>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={goBack}
      >
        Back
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={deletePost}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      {renderButtons()}

      <div className="p-6 rounded-lg shadow-lg bg-white">
        {/* Post Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          />
        )}

        {/* Post Title */}
        <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>

        {/* Post Date and Author */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">{formattedDate}</span>
          <span className="text-gray-700 text-sm">{post.author || 'Anonymous'}</span>
        </div>

        {/* Post Content */}
        <p className="text-lg text-gray-700">{post.text}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
