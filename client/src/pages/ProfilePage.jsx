import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details'); // Track active section
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(''); // For password update
  const [posts, setPosts] = useState([]); // Store user posts

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not found
    } else {
      fetchUserPosts(); // Fetch posts if user exists
    }
  }); //[user, navigate]);

  // Fetch user's posts
  const fetchUserPosts = async () => {
    try {
      const response = await fetch('http://localhost:3500/posts/my-posts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`, // Pass token for authentication
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts || []);
      } else {
        console.error('Failed to fetch posts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle username update
  const handleUpdateUsername = async () => {
    if (!username.trim()) return alert('Username cannot be empty.');
    try {
      const response = await fetch('http://localhost:3500/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Assuming you have JWT for auth
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ ...user, username: data.username });
        alert('Username updated successfully!');
        setActiveTab('details'); // Return to details view
      } else {
        alert(data.message || 'Failed to update username.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle password update
  const handleUpdatePassword = async () => {
    if (!password.trim()) return alert('Password cannot be empty.');
    try {
      const response = await fetch('http://localhost:3500/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Assuming you have JWT for auth
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully!');
        setActiveTab('details'); // Return to details view
        setPassword(''); // Clear the password field
      } else {
        alert(data.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3500/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        // Clear the user state
        setUser(null);
        localStorage.removeItem('token'); // Clear token from localStorage
        navigate('/login'); // Redirect to login
      } else {
        alert('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Gracefully handle the loading state
  }

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
          className={`p-4 hover:bg-gray-700 text-left ${activeTab === 'posts' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          My Posts
        </button>
        <button
          className="p-4 hover:bg-gray-700 text-left"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === 'details' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Profile Details</h1>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Password:</strong> ********
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
            <div className="flex items-center space-x-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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

        {activeTab === 'posts' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">My Posts</h1>
            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li
                    key={post._id}
                    className="border border-gray-300 rounded p-4 bg-white shadow"
                  >
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p className="text-gray-600">{post.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
