import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, setUser, posts = [] }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details'); // Track active section
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not found
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; // Gracefully handle the loading state
  }

  const passwordRules = `
    Password must:
    - Be at least 10 characters long.
    - Include at least one uppercase letter.
    - Include at least one lowercase letter.
    - Include at least one special character (!, @, #, $, %, ^, &, *).
  `;

  // Validations
  const validateUsername = (username) => /^[A-Za-z][A-Za-z0-9]*$/.test(username);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/.test(password);

  // Handle username update
  const handleUpdateUsername = async () => {
    if (!validateUsername(username)) {
      setErrorMessage(
        'Username must start with a letter and contain no special characters.'
      );
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ ...user, username: data.username });
        setErrorMessage(''); // Clear error
        setActiveTab('details');
      } else {
        setErrorMessage(data.message || 'Failed to update username.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Handle password update
  const handleUpdatePassword = async () => {
    if (!validatePassword(password)) {
      setErrorMessage(passwordRules);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        setErrorMessage(''); // Clear error
        setActiveTab('details');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Profile</div>
        <button
          className={`p-4 hover:bg-gray-700 text-left ${activeTab === 'details' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Profile Details
        </button>
        <button
          className={`p-4 hover:bg-gray-700 text-left ${activeTab === 'username' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('username')}
        >
          Edit Username
        </button>
        <button
          className={`p-4 hover:bg-gray-700 text-left ${activeTab === 'password' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
        <button
          className="p-4 hover:bg-gray-700 text-left"
          onClick={() => {
            setUser(null);
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {errorMessage && (
          <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span>{errorMessage}</span>
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Profile Details</h1>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        )}

        {activeTab === 'username' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Edit Username</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter new username"
                className="border border-gray-300 rounded p-2 flex-1"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateUsername}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Change Password</h1>
            <p className="mb-4 text-gray-700">{passwordRules}</p>
            <div className="flex items-center space-x-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="border border-gray-300 rounded p-2 flex-1"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="border border-gray-300 rounded p-2 flex-1"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdatePassword}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
