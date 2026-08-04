const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const { asyncHandler } = require("../utils/asyncHandler");

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: 1 });
  const result = await Promise.all(
    courses.map(async (course) => {
      const topicsCount = await Lesson.countDocuments({ courseId: course._id });
      return {
        id: course._id,
        slug: course.slug,
        name: course.name,
        emoji: course.emoji,
        description: course.description,
        gradient: course.gradient,
        textColor: course.textColor,
        enrolled: course.enrolled,
        difficulty: course.difficulty,
        topicsCount,
      };
    })
  );
  res.json({ courses: result });
});

const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }
  res.json({ course });
});

module.exports = { getCourses, getCourseById };
