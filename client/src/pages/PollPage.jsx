import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PollBoard from './PollBoard';
import { toast } from 'react-toastify';
// import { getUserFromToken } from '../utils/auth'; // Import the utility


const PollPage = ({ polls, setPolls }) => {
  const voterId = localStorage.getItem('voterID') || 'guest'; // Replace with real user ID logic///////////////
  const { id } = useParams(); // Get the poll ID from the URL
  const navigate = useNavigate();

  // Find the specific poll using the ID from the params             ////////////// Important
  const poll = polls.find((p) => p.id === parseInt(id));

  // Handle the case when no poll is found
  if (!poll) {
    console.log("Poll ID from params:", id);
    return <div className="text-center mt-10 text-red-500">Poll not found2.</div>;
  }

  const hasVoted = poll.voters.includes(voterId);   //////////////////CHANGE
  console.log(hasVoted)

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


  const handleVote = async (pollId, optionIndex) => {
  
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optionIndex, voterId }),
      });

      if (voterId === 'guest') {
        toast.error('Please log in before voting.');
      }
  
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'Failed to vote');
        return;
      }
  
      const updatedPoll = await response.json();
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll.id === pollId ? updatedPoll.poll : poll))
      );
  
      toast.success('Vote submitted!');
    } catch (err) {
      console.error(err);
      // toast.error('An error occurred while voting.');
      toast.error(`An error occurred while voting: ${err.message}`);
    }
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


  const renderOptions = () => {
    if (!Array.isArray(poll.options) || poll.options.length === 0) {
      return <p>No options available</p>; // Show a fallback if there are no options
    }
    
    return (
      <div className="flex flex-col space-y-4 mb-6">
        <ul>
          {poll.options.map((option, index) => (
   
            <li key={index} className="mb-2">
              <button
                disabled={hasVoted} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleVote(poll.id, index)}
              >
                {option} (Votes: {poll.votes?.[index] ?? 0})
              </button>
            </li>
           
          ))}
        </ul>
      </div>
    );
  };
  
  

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
        {renderOptions()}
        {/* <p className="text-lg text-gray-700">{poll.text}</p> */}

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">Voted: {toString(hasVoted)}</span> 
          {/* <span className="text-gray-700 text-sm">{poll.author || 'Anonymous'}</span> */}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
