
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory


const Home = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const navigateToBlogBoard = () => {
    navigate('/blog-board'); // Navigate to the Blog Board page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className='text-5xl mt-10'>GatorConnect</h1>
      <div className="flex mt-5">
        <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500">temp</button>
        <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500">temp</button>
        <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500" 
        onClick={navigateToBlogBoard}>Blog Board</button> 
      </div>
    </div>
  );
};

export default Home;
