import React, {useState} from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import BlogBoard from './pages/BlogBoard';
import BlogPostPage from './pages/BlogPostPage';
import MainLayout from './layouts/MainLayout';

function App() {
  const [posts, setPosts] = useState([]);

  
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
    </Route>
    )
  )
  return <RouterProvider router={router} />
    

}

export default App;
