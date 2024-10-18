import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import BlogBoard from './pages/BlogBoard';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/blog-board" 
          element={<BlogBoard posts={posts} setPosts={setPosts}/>} 
        />
        <Route 
          path="/blog/:id" 
          element={<BlogPostPage posts={posts} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
