const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("name avatar xp streak")
    .sort({ xp: -1, streak: -1 })
    .limit(50);

  const leaderboard = users.map((u, idx) => ({
    rank: idx + 1,
    userId: u._id,
    name: u.name,
    emoji: u.avatar || "🤖",
    xp: u.xp,
    streak: u.streak,
  }));

  res.json({ leaderboard });
});

const getMyRank = asyncHandler(async (req, res) => {
  const all = await User.find().select("_id xp streak").sort({ xp: -1, streak: -1 });
  const index = all.findIndex((u) => u._id.toString() === req.user._id.toString());
  res.json({
    rank: index >= 0 ? index + 1 : null,
    xp: req.user.xp,
    streak: req.user.streak,
  });
});

module.exports = { getLeaderboard, getMyRank };
