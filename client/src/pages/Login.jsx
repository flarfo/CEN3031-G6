import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error('Email and password are required', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Simulate login check
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/auth/login`, {
        method: 'POST',  // Correct method for login
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        }),
      });
                
      console.log('Response:', response);
      console.log('Response Status:', response.status);
      const data = await response.json();


      console.log(data);
      if (response.ok) {
        if (data)
        setEmail('');
        toast.success('Login successful!', {
            position: 'top-center',
        });
         
          
      } else {
          toast.error(data.message || 'Error during sign-up.', {
              position: 'top-center',
          });
      }
  } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', {
          position: 'top-center',
      });
    };
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-lg p-10 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 mt-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 mt-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => toast.info('Forgot password functionality coming soon!')}
          >
            Forgot Password?
          </button>
          <NavLink to='/sign-up' className='text-blue-500 hover:underline'>
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
