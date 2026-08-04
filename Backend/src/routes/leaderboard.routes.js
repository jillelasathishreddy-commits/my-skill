const express = require("express");
const { protect } = require("../middleware/auth");
const { getLeaderboard, getMyRank } = require("../controllers/leaderboard.controller");

const router = express.Router();

router.get("/", getLeaderboard);
router.get("/me", protect, getMyRank);

module.exports = router;
