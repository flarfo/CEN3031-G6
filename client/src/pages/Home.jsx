
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';


const Home = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const navigateToBlogBoard = () => {
    navigate('/blog-board'); // Navigate to the Blog Board page
  };

  return (
    <>
      <Navbar />
          <div className="flex mt-5">
            <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500">temp</button>
            <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500">temp</button>
            <button className="mx-2 px-6 py-3 text-2xl bg-gray-600 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-500" 
            onClick={navigateToBlogBoard}>Blog Board</button> 
          </div>

    </>
  );
};

export default Home;
