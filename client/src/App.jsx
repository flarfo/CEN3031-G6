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
import AddPost from './pages/AddPost';
import PollBoard from './pages/PollBoard';
import PollPage from './pages/PollPage';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // localStorage.setItem('voterID', 'guest');


  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);

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
          <Route path="/blog-board" element={<BlogBoard posts={posts} setPosts={setPosts} user={user} />} /> {/* Pass user prop */}
          <Route path="/blog/:id" element={<BlogPostPage user={user} posts={posts} setPosts={setPosts}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/calendar" element={<EventCalendar user={user}/>} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/add-post" element={<AddPost user={user} posts={posts} setPosts={setPosts} />} />
          <Route path="/poll-board" element={<PollBoard user={user} polls={polls} setPolls={setPolls}/>} />
          <Route path="/polls/:id" element={<PollPage user={user} polls={polls} setPolls={setPolls}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;