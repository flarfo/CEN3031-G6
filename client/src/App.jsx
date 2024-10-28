import React, {useState} from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import BlogBoard from './pages/BlogBoard';
import BlogPostPage from './pages/BlogPostPage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import PollBoard from './pages/PollBoard'
import PollPage from './pages/PollPage'

function App() {
  const [posts, setPosts] = useState([]);

  const [polls, setPolls] = useState([]);
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route 
        path="/blog-board" 
        element={<BlogBoard posts={posts} setPosts={setPosts}/>} 
      />
      <Route 
        path="/blog/:id" 
        element={<BlogPostPage posts={posts} />} 
      />
      <Route 
        path="/poll-board" 
        element={<PollBoard polls={polls} setPolls={setPolls}/>} 
      />
      <Route 
        path="/poll/:id" 
        element={<PollPage polls={polls} />} 
      />
      <Route path = "/login"
        element = {<Login />}
      />
      <Route path ='/sign-up' 
      element = {<SignUp />}
      />
    </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App;
