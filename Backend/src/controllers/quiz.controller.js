const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const submitQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const { answers } = req.validated.body;

  const lessonFilter = mongoose.Types.ObjectId.isValid(lessonId)
    ? { _id: lessonId }
    : { topicId: lessonId };

  const lesson = await Lesson.findOne(lessonFilter);
  if (!lesson) {
    res.status(404);
    throw new Error("Lesson not found");
  }

  const quiz = await Quiz.findOne({ lessonId: lesson._id });
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  const total = quiz.questions.length;
  let correctCount = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correct) correctCount += 1;
  });

  const score = Math.round((correctCount / total) * 100);
  const xpEarned = Math.round((correctCount * lesson.xpReward * 1.2) / total);
  const coinsEarned = Math.round((correctCount * lesson.coinReward) / total);

  await QuizAttempt.create({
    userId: req.user._id,
    lessonId: lesson._id,
    answers,
    score,
    xpEarned,
    coinsEarned,
  });

  const user = await User.findById(req.user._id);
  user.xp += xpEarned;
  user.coins += coinsEarned;
  user.level = Math.max(1, Math.floor(user.xp / 300) + 1);
  if (!user.completedTopics.includes(lesson.topicId)) {
    user.completedTopics.push(lesson.topicId);
  }
  await user.save();

  res.json({
    message: "Quiz submitted",
    result: { score, xpEarned, coinsEarned, total, correctCount },
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

module.exports = { submitQuiz };
