const express = require("express");
const { getCourses, getCourseById } = require("../controllers/courses.controller");
const { getLessonsByCourse } = require("../controllers/lessons.controller");

const router = express.Router();

router.get("/", getCourses);
router.get("/:courseId", getCourseById);
router.get("/:courseId/lessons", getLessonsByCourse);

module.exports = router;
