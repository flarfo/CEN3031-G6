import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPostPage = ({ posts }) => {
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

  // Navigate to the edit page
  const edit = () => {
    navigate(`/edit/${post.id}`); // Assuming you have an edit page route
  };

  // Render the buttons (Back and Edit)
  const renderButtons = () => (
    <div className='flex space-x-2 mb-6'>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={goBack}
      >
        Back
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={edit}
      >
        Edit
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
