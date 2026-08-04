const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createToken } = require("../utils/token");
const { asyncHandler } = require("../utils/asyncHandler");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validated.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error("Email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = createToken(user._id.toString());

  res.status(201).json({
    message: "Signup successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      coins: user.coins,
      completedTopics: user.completedTopics,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = createToken(user._id.toString());
  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      xp: user.xp,
      level: Math.max(1, Math.floor(user.xp / 300) + 1),
      streak: user.streak,
      coins: user.coins,
      completedTopics: user.completedTopics,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.json({ message: "Logout successful" });
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

module.exports = { signup, login, logout, me };
