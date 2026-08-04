const express = require("express");
const { getLessonById, getQuizByLesson } = require("../controllers/lessons.controller");
const { submitQuiz } = require("../controllers/quiz.controller");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { z } = require("zod");

const router = express.Router();

const submitSchema = z.object({
  body: z.object({
    answers: z.array(z.number().int()).min(1),
  }),
  params: z.object({}),
  query: z.object({}),
});

router.get("/:lessonId", getLessonById);
router.get("/:lessonId/quiz", getQuizByLesson);
router.post("/:lessonId/quiz/submit", protect, validate(submitSchema), submitQuiz);

module.exports = router;
