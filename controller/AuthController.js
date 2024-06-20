const bcrypt = require('bcrypt');
const User = require('../model/UserModel');
const Task = require('../model/TaskModel');
const { generateToken } = require('../helper/util-helper');

// Signup Handler
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already used!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    const newUser = await user.save();
    const dummyTask = new Task({
      title: 'Lorem Ipsum',
      text: 'Dolor sit amet',
      status: 'todo',
      user: newUser._id,
    });
    await dummyTask.save();

    // Generate JWT token
    const token = generateToken(newUser);

    // Return user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Login Handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email or password incorrect!' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user and token
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { signup, login };