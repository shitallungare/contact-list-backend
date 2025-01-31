const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashPassword);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await userModel.findOne({ email }); // Corrected from User to userModel
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, // Corrected spelling
      { expiresIn: "15m" } // Corrected spelling
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// This is a private method
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
