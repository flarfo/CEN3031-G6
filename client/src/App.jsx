import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogBoard from './pages/BlogBoard';
import BlogPostPage from './pages/BlogPostPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EventCalendar from './pages/Calendar';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate session with the server on app load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/auth/validate-session`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user state with validated session data
        } else {
          console.error('Session validation failed');
          setUser(null);
        }
      } catch (error) {
        console.error('Error validating session:', error);
        setUser(null);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };
  
    fetchSession();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-board" element={<BlogBoard posts={posts} setPosts={setPosts} />} />
          <Route path="/blog/:id" element={<BlogPostPage posts={posts} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
