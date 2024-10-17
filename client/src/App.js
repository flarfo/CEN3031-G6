import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import Home component
import BlogBoard from './BlogBoard'; // Import BlogBoard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/blog-board" element={<BlogBoard />} /> {/* Blog Board route */}
      </Routes>
    </Router>
  );
}

export default App;
