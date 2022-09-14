const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    isAdmin: isAdmin || false,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken({ id: user.id, email, name, isAdmin }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { caloriesTarget } = req.body;
  const { id } = req.user;
  const updateUser = await User.findByIdAndUpdate(
    { _id: id },
    { caloriesTarget },
    { new: true }
  );
  if (updateUser) {
    res.status(201).json(updateUser);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Generate JWT
const generateToken = ({ id, email, name, isAdmin }) => {
  return jwt.sign({ id, email, name, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user, token: req.token });
});

const getToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const { _id, email, name, caloriesTarget, isAdmin } = userExists;
    const userToken = generateToken({ id: _id, email, name, isAdmin });
    res.status(200).json({
      token: userToken,
      user: { name: name, caloriesTarget, id: _id, email, isAdmin },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const listAllUsers = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    const usersList = await User.find();
    res.send(usersList);
  } else {
    res.status(400);
    throw new Error("You are not an admin");
  }
});

module.exports = {
  listAllUsers,
  registerUser,
  updateUser,
  getUser,
  getToken,
};
