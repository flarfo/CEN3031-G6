import React from 'react';

<<<<<<< HEAD

=======
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
const Poll = ({ poll, onClick }) => {
  return (
    <div 
      className="max-w-md bg-white shadow-md rounded p-4 mb-4 cursor-pointer"
<<<<<<< HEAD
      // style={{ backgroundColor: poll.color }} 
      style={{ backgroundColor: '#ffeb3b' }} 
=======
      style={{ backgroundColor: poll.color }} 
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
      onClick={onClick} 
    >
      <h2 className="poll-title font-semibold text-lg">{poll.question}</h2>
      <div className="poll-date text-gray-500">{poll.date}</div>
      <p className="poll-text">{poll.options}</p>
    </div>
  );
};

export default Poll;