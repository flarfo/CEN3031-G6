import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PollPage = ({ polls }) => {
  const { id } = useParams(); // Get the poll ID from the URL
  const navigate = useNavigate();

  // Find the specific poll using the ID from the params
  const poll = polls.find((p) => p.id === parseInt(id));

  // Handle the case when no poll is found
  if (!poll) {
    return <div className="text-center mt-10 text-red-500">Poll not found.</div>;
  }

  // Format the date as "Month Day, Year"
  const formattedDate = new Date(poll.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Navigate back to the poll board
  const goBack = () => {
    navigate('/poll-board');
  };

  // Navigate to the edit page
  const edit = () => {
    navigate(`/edit/${poll.id}`); // Assuming you have an edit page route
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
        {/* Poll Image */}
        {poll.image && (
          <img
            src={poll.image}
            alt={poll.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          />
        )}

        {/* Poll Title */}
        <h1 className="text-3xl font-semibold mb-4">{poll.title}</h1>

        {/* Poll Date and Author */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">{formattedDate}</span>
          <span className="text-gray-700 text-sm">{poll.author || 'Anonymous'}</span>
        </div>

        {/* Poll Content */}
        <p className="text-lg text-gray-700">{poll.text}</p>
      </div>
    </div>
  );
};

export default PollPage;
