const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Create Token Function
const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };
  console.log("JWT Payload:", payload); // Log the payload
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.validateSession = (req, res) => {
  const token = req.cookies.token; // Access the token from cookies
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    // Save the user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = createToken(user);

    res
    .cookie('token', token, {
        httpOnly: true,
        secure: false, // Set true in production
        sameSite: 'Lax', // Allows cross-origin cookies for development
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({ message: 'Logged in successfully' });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await user.isPasswordValid(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = createToken(user);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Add token to the response
      res.status(200).json({ message: 'Logged in successfully', token, voterID: (user._id).toString() });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Update User Details (username or password)
exports.updateUser = async (req, res) => {
  const { username, password } = req.body;
  const token = req.cookies.token; // Extract the token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password; // Make sure your `User` model hashes the password
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', username: user.username });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};