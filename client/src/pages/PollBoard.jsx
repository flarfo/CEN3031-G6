import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Poll from '../components/Poll';
import { toast } from 'react-toastify';

const PollBoard = ({ polls, setPolls }) => {
  const [newPoll, setNewPoll] = useState('');
  const [pollTitle, setPollTitle] = useState('');
  const [pollDate, setPollDate] = useState('');
  const [pollAuthor, setPollAuthor] = useState(''); // State for author
  const [isInputVisible, setInputVisible] = useState(false);
  // const [pollOptions, setPollOptions] = useState([]);
  // const [pollVotes, setPollVotes] = useState([]);


  const navigate = useNavigate();

  // GET request to server, update polls array on completion
  useEffect(() => {
    const getExistingPolls = async () => {
      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/polls`, requestOptions);
        const data = await response.json();
        if (!data.length) return;

        // data.forEach((poll, i) => {
        //   data[i] = {
        //     id: i,
        //     title: poll.title,
        //     text: poll.text,
        //     date: poll.date,
        //     options: poll.options,
        //     author: poll.author
        //   };
        // });

        data.forEach((poll, i) => {
          data[i] = {
            id: i,
            title: poll.title || 'Untitled Poll',
            text: poll.text || 'No description available',
            date: poll.date || 'Unknown Date',
            options: poll.options || [],
            votes: poll.votes || [],
            voters: poll.voters || [],
            author: poll.author || 'Anonymous'
          };
        });

        setPolls(data);
      } catch (err) {
        console.log(err);
      }
    };

    getExistingPolls();
  }, [setPolls]);                         /////////////

  const goBack = () => {
    navigate('/');
  };

  const handlePollClick = (poll) => {
    navigate(`/polls/${poll.id}`);
  };

  const handleAddPoll = async () => {

    if (newPoll.trim() !== '' && pollDate !== '' && pollTitle.trim() !== '' && pollAuthor.trim() !== '') {
      // const optionsArray = newPoll.split(',').map(option => option.trim());
      // const votesArray = new Array(optionsArray.length).fill(0); // Initialize votes to 0

      const optionsArray = newPoll.split(',').map(option => option.trim());
      const votesArray = []; // Initialize votes to 0
      const votersArray = [];

      const newPollEntry = {
        id: polls.length,
        title: pollTitle,
        options: optionsArray,
        votes: votesArray,
        voters: votersArray,
        date: pollDate,
        author: pollAuthor, // Include the author in the poll data
      };
      setPolls((prevPolls) => [...prevPolls, newPollEntry]);
      setNewPoll('');
      setPollTitle('');
      setPollDate('');
      setPollAuthor(''); // Reset the author input
      setInputVisible(false);

      sendPollToServer(newPollEntry);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  const sendPollToServer = async (pollData) => {
    try {
      const requestOptions = {
        method: 'POST',                 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: pollData.id,
          title: pollData.title,
          options: pollData.options,
          votes: pollData.votes,
          date: pollData.date,
          voters: pollData.voters,
          author: pollData.author, // Include the author when sending to the server
        })
      };

      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/polls`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Error sending poll to server');
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      // toast.error("Error posting to server: ", error);//////////////////////////////
      toast.error(`Error posting to server: ${error.message}`);

    }
  };


  

  return (
    <div className="poll-board-container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <button className="back-button bg-blue-500 text-white py-2 px-4 rounded" onClick={goBack}>
          Back
        </button>
        <button className="add-poll-button bg-green-500 text-white py-2 px-4 rounded" onClick={() => setInputVisible(!isInputVisible)}>
          Add Poll
        </button>
      </div>

      {/* Adjusted margin for less space between title and navbar */}
      <h1 className="text-3xl text-center font-bold mb-4">Polls</h1>

      {isInputVisible && (
        <div className="input-container mb-6">
          <input
            type="text"
            value={pollTitle}
            onChange={(e) => setPollTitle(e.target.value)}
            placeholder="Poll Question"
            className="poll-title-input border border-gray-300 rounded p-2 mb-2 w-full"
          />
          {/* <textarea
            value={newPoll}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Enter poll options (comma separated)"
            rows="4"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          /> */}

          <input
              type="text"
              value={newPoll}
              onChange={(e) => setNewPoll(e.target.value)}
              placeholder="Enter poll options (comma separated)"
              className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <div className="poll-options flex space-x-2 mb-2">
            <input
              type="date"
              value={pollDate}
              onChange={(e) => setPollDate(e.target.value)}
              className="date-input border border-gray-300 rounded p-2 w-full"
            />
            {/* <input
              type="text"
              value={pollTags}
              onChange={(e) => setPollTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
              className="tags-input border border-gray-300 rounded p-2 w-full"
            /> */}
            <input
              type="text"
              value={pollAuthor}
              onChange={(e) => setPollAuthor(e.target.value)}
              placeholder="Enter author name"
              className="author-input border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button className="submit-poll-button bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddPoll}>
            Submit
          </button>
        </div>
      )}

      {/* Polls Layout */}
      {/* const formattedDate = new Date(poll.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); */}
      <div className="polls-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll, index) => (
          <div key={index} className="poll-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x300" alt="Poll" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{poll.title}</h2>
              {/* <p className="text-gray-600 text-sm">Poll start date: {poll.date}</p> */} 
              <p className="text-gray-600 text-sm">Poll start date: {new Date(poll.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <p className="text-gray-600 text-sm">By: {poll.author}</p> {/* Display the author */}
              {/* <p className="text-gray-700 mt-2">{poll.options}...</p>    */}
              {/* <div className="tags mt-2">
                {poll.options.map((option, idx) => (
                  <span key={idx} className="tag bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2">{option}</span>
                ))}
              </div> */}
              
              {/* poll.text.slice(0, 100) */}


              {/* <div className="tags mt-2">
                {poll.tags.map((tag, idx) => (
                  <span key={idx} className="tag bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2">{tag}</span>
                ))}
              </div> */}
              <button className="read-more mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handlePollClick(poll)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default PollBoard;
