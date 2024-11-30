import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Poll from '../components/Poll';
import { toast } from 'react-toastify';

const PollBoard = ({ polls, setPolls }) => {
  const [newPoll, setNewPoll] = useState('');
  const [pollTitle, setPollTitle] = useState('');
  const [pollDate, setPollDate] = useState('');
  const [pollTags, setPollTags] = useState('');
  const [pollAuthor, setPollAuthor] = useState(''); // State for author
=======
import { json, useNavigate } from 'react-router-dom';
import Poll from '../components/Poll'; 
import { toast } from 'react-toastify';

const PollBoard = ({polls, setPolls}) => {
  const [newPoll, setNewPoll] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollDate, setPollDate] = useState('');
  const [pollColor, setPollColor] = useState('#ffeb3b');
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
  const [isInputVisible, setInputVisible] = useState(false);

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
<<<<<<< HEAD

      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/polls`, requestOptions);
        const data = await response.json();
        if (!data.length) return;

        data.forEach((poll, i) => {
          data[i] = {
            id: i,
            title: poll.title || 'Untitled Poll',
            text: poll.text || 'No description available',
            date: poll.date || 'Unknown Date',
            tags: poll.tags || [],
            author: poll.author || 'Anonymous',
          };
        });

        setPolls(data);
      } catch (err) {
=======
  
      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, requestOptions);
        const data = await response.json();

        if (!data.length) return;

        for (let i = 0; i < data.length; i++) {
          data[i] = { 
            id: i,
            title: data[i].title, 
            text: data[i].text, 
            date: data[i].date,
            color: data[i].color 
          };
        }

        setPolls(data);
      }
      catch (err) {
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
        console.log(err);
      }
    };

    getExistingPolls();
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const handlePollClick = (poll) => {
<<<<<<< HEAD
    navigate(`/poll/${poll.id}`);
  };

  const handleAddPoll = async () => {
    if (newPoll.trim() !== '' && pollDate !== '' && pollTitle.trim() !== '' && pollAuthor.trim() !== '') {
      const newPollEntry = {
        id: polls.length + 1,
        title: pollTitle,
        text: newPoll,
        date: pollDate,
        tags: pollTags.split(',').map(tag => tag.trim()),
        author: pollAuthor, // Include the author in the poll data
      };
      setPolls((prevPolls) => [...prevPolls, newPollEntry]);
      setNewPoll('');
      setPollTitle('');
      setPollDate('');
      setPollTags('');
      setPollAuthor(''); // Reset the author input
=======
    navigate(`/polls/${poll.id}`); // Correctly using the poll ID
  };

  const handleAddPoll = () => {
    if (newPoll.trim() !== '' && pollDate !== '' && pollQuestion.trim() !== '') {
      const newPollEntry = {
        id: polls.length, // Use the current length of the polls array as ID
        question: pollQuestion, 
        options: newPoll,       ////
        date: pollDate, 
        color: pollColor 
      };
      setPolls((prevPolls) => [...prevPolls, newPollEntry]);
      setNewPoll('');
      setPollQuestion('');
      setPollDate('');
      setPollColor('#ffeb3b');
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
      setInputVisible(false);

      sendPollToServer(newPollEntry);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

<<<<<<< HEAD
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
          text: pollData.text,
          date: pollData.date,
          tags: pollData.tags,
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
            placeholder="Poll Title"
            className="poll-title-input border border-gray-300 rounded p-2 mb-2 w-full"
          />
          <textarea
            value={newPoll}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Enter poll options (comma separated)"
            rows="4"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <div className="poll-options flex space-x-2 mb-2">
=======
  const sendPollToServer = (pollData) => {
    const requestOptions = {
      method: 'poll',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: pollData.id, question: pollData.question, options: pollData.options, date: pollData.date, color: pollData.color })
    };
    
    fetch(`${process.env.REACT_APP_DEV_API_URL}/events`, requestOptions);
  };

  return (
    <div className="blog-board-container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="back-button bg-blue-500 text-white py-2 px-4" onClick={goBack}>
          Back
        </button>
        <button className="add-poll-button bg-green-500 text-white py-2 px-4 rounded" onClick={() => setInputVisible(!isInputVisible)}>
          Add poll
        </button>
      </div>
      <h1 className="text-3xl text-center font-bold mb-6">Polls</h1>

      {isInputVisible && (
        <div className="input-container mb-4">
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Poll Question"
            rows="3"
            className="poll-question-input border border-gray-300 rounded p-2 mb-2 w-full"
          />
          <textarea
            value={newPoll[polls.length++]}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Option 1"
            rows="1"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <textarea
            value={newPoll[polls.length++]}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Option 2"
            rows="1"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <textarea
            value={newPoll[polls.length++]}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Option 3"
            rows="1"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <textarea
            value={newPoll[polls.length++]}
            onChange={(e) => setNewPoll(e.target.value)}
            placeholder="Option 4"
            rows="1"
            className="poll-input border border-gray-300 rounded p-2 w-full"
          />
          <div set="poll-options flex space-x-2 mb-2">
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
            <input
              type="date"
              value={pollDate}
              onChange={(e) => setPollDate(e.target.value)}
              className="date-input border border-gray-300 rounded p-2 w-full"
            />
<<<<<<< HEAD
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
=======
            <input
              type="color"
              value={pollColor}
              onChange={(e) => setPollColor(e.target.value)}
              className="color-input border border-gray-300 rounded p-2"
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
            />
          </div>
          <button className="submit-poll-button bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddPoll}>
            Submit
          </button>
        </div>
      )}

<<<<<<< HEAD
      {/* Polls Layout */}

      <div className="polls-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll, index) => (
          <div key={index} className="poll-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/600x300" alt="Poll" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{poll.title}</h2>
              <p className="text-gray-600 text-sm">Polled on: {poll.date}</p>
              <p className="text-gray-600 text-sm">By: {poll.author}</p> {/* Display the author */}
              <p className="text-gray-700 mt-2">{poll.text.slice(0, 100)}...</p>
              <div className="tags mt-2">
                {poll.tags.map((tag, idx) => (
                  <span key={idx} className="tag bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-2">{tag}</span>
                ))}
              </div>
              <button className="read-more mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handlePollClick(poll)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div> 
=======
      <div className="polls-container">
        {polls.map((poll, index) => (
          <Poll key={index} poll={poll} onClick={() => handlePollClick(poll)} />
        ))}
      </div>
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
    </div>
  );
};

<<<<<<< HEAD
export default PollBoard;
=======
export default PollBoard;
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
