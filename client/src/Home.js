
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const navigateToBlogBoard = () => {
    navigate('/blog-board'); // Navigate to the Blog Board page
  };

  return (
    <div className="home-container">
      <h1>GatorConnect</h1>
      <div className="button-container">
        <button className="temp-button">temp</button>
        <button className="temp-button">temp</button>
        <button className="temp-button" onClick={navigateToBlogBoard}>Blog Board</button> {/* Blog Board button */}
      </div>
    </div>
  );
};

export default Home;
