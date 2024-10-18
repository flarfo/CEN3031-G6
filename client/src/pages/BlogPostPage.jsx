import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPostPage = ({ posts }) => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  console.log('Retrieved ID:', id);
  console.log('Posts Array:', posts);

  // Find the specific post using the ID from the params
  const post = posts.find((p) => p.id === parseInt(id));

  // Handle the case when no post is found
  if (!post) {
    return <div className="text-center mt-10 text-red-500">Post not found.</div>;
  }

  const goBack = () => {
    navigate('/blog-board');
  };

  const edit = () => {
    navigate('TODO')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className='flex space-x-2 mb-4'>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={goBack}
        >
          Back
        </button>
        <button
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={edit}
        >
          edit
        </button>
      </div>

      <div
        className="bg-yellow-200 p-6 rounded-lg shadow-md"
        style={{ backgroundColor: post.color }}
      >
        <div className="text-gray-600 text-sm mb-2">{post.date}</div>
        <p className="text-lg">{post.text}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
