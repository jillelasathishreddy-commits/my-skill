const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json({ user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.validated.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (name) user.name = name;
  if (avatar) user.avatar = avatar;
  await user.save();

  res.json({
    message: "Profile updated",
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

module.exports = { getProfile, updateProfile };
