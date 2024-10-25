const User = require('../models/User');
const bcrypt = require('bcryptjs');

// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const existingEmail = await User.findOne({email});
    if (existingEmail){
        return res.status(400).json({message: 'email already exists'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

const jwt = require('jsonwebtoken');

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };

