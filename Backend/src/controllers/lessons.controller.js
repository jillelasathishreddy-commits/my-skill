const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const { asyncHandler } = require("../utils/asyncHandler");

const getLessonsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const lessons = await Lesson.find({ courseId }).sort({ createdAt: 1 });
  res.json({ lessons });
});

const getLessonById = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const filter = mongoose.Types.ObjectId.isValid(lessonId)
    ? { _id: lessonId }
    : { topicId: lessonId };

  const lesson = await Lesson.findOne(filter);
  if (!lesson) {
    res.status(404);
    throw new Error("Lesson not found");
  }
  res.json({ lesson });
});

const getQuizByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
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
    throw new Error("Quiz not found for this lesson");
  }

  res.json({
    lessonId: lesson._id,
    topicId: lesson.topicId,
    questions: quiz.questions,
  });
});

module.exports = { getLessonsByCourse, getLessonById, getQuizByLesson };
