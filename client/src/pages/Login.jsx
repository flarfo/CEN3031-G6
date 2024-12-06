import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for version 4.0.0

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:3500/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Debugging response
      if (response.ok) {
        const token = data.token;
        if (token) {
          console.log('Token received:', token);
          localStorage.setItem('token', token); // Store token in localStorage
          localStorage.setItem('voterID', data.voterID);  // Store userID
          const decodedUser = jwtDecode(token); // Decode the token
          setUser(decodedUser); // Set user state

          // Redirect to home after a slight delay
          setTimeout(() => {
            navigate('/'); // Redirect to home
          }, 1000);
        } else {
          console.error('No token in response');
          setLoading(false); // Stop loading on failure
        }
      } else {
        console.error('Login failed:', data.message);
        alert('Login failed')
        setLoading(false); // Stop loading on failure
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login')
      setLoading(false); // Stop loading on error
    }
  };

  if (loading) {
    // Loading screen with spinner
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Redirecting to Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
          {/* <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => console.log('Forgot password functionality coming soon!')}
          >
            Forgot Password?
          </button> */}
          <NavLink to="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
