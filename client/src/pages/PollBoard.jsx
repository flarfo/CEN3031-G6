import React, { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import Poll from '../components/Poll'; 
import { toast } from 'react-toastify';

const PollBoard = ({polls, setPolls}) => {
  const [newPoll, setNewPoll] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollDate, setPollDate] = useState('');
  const [pollColor, setPollColor] = useState('#ffeb3b');
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
        console.log(err);
      }
    };

    getExistingPolls();
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const handlePollClick = (poll) => {
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
      setInputVisible(false);

      sendPollToServer(newPollEntry);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

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
            <input
              type="date"
              value={pollDate}
              onChange={(e) => setPollDate(e.target.value)}
              className="date-input border border-gray-300 rounded p-2 w-full"
            />
            <input
              type="color"
              value={pollColor}
              onChange={(e) => setPollColor(e.target.value)}
              className="color-input border border-gray-300 rounded p-2"
            />
          </div>
          <button className="submit-poll-button bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddPoll}>
            Submit
          </button>
        </div>
      )}

      <div className="polls-container">
        {polls.map((poll, index) => (
          <Poll key={index} poll={poll} onClick={() => handlePollClick(poll)} />
        ))}
      </div>
    </div>
  );
};

export default PollBoard;
