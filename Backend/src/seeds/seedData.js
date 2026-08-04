const bcrypt = require("bcrypt");
const env = require("../config/env");
const { connectDB } = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");

async function runSeed() {
  await connectDB(env.mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Lesson.deleteMany({}),
    Quiz.deleteMany({}),
  ]);

  const demoPassword = await bcrypt.hash("password123", 10);
  await User.create({
    name: "Demo Learner",
    email: "demo@codequest.ai",
    password: demoPassword,
    avatar: "🤖",
    xp: 2840,
    level: 10,
    streak: 7,
    coins: 340,
    completedTopics: [],
  });

  const courses = await Course.insertMany([
    {
      slug: "python",
      name: "Python",
      emoji: "🐍",
      description: "Simple syntax, powerful libraries. Perfect for beginners and AI/ML!",
      gradient: "from-yellow-400 via-green-400 to-emerald-500",
      textColor: "text-emerald-900",
      enrolled: "2.4M",
      difficulty: 1,
    },
    {
      slug: "javascript",
      name: "JavaScript",
      emoji: "⚡",
      description: "Language of the web. Build interactive websites and apps!",
      gradient: "from-yellow-300 via-amber-400 to-orange-500",
      textColor: "text-orange-900",
      enrolled: "3.1M",
      difficulty: 2,
    },
  ]);

  const python = courses.find((c) => c.slug === "python");
  const js = courses.find((c) => c.slug === "javascript");

  const lessons = await Lesson.insertMany([
    {
      courseId: python._id,
      topicId: "py-hello",
      title: "Hello World",
      subtitle: "Your first Python program",
      level: "beginner",
      icon: "👋",
      duration: "5 min",
      xpReward: 25,
      coinReward: 10,
      subtitles: [
        "Python lo programming start chestham! 🐍",
        "print() function shows text on screen",
      ],
      voiceScript: "Welcome to Python. Let's print Hello World.",
      keyPoints: ["Use print()", "Text should be inside quotes"],
      code: "print('Hello, World!')",
      codeExplanation: "print() displays output on screen.",
      output: "Hello, World!",
    },
    {
      courseId: js._id,
      topicId: "js-basics",
      title: "JavaScript Basics",
      subtitle: "Variables and console output",
      level: "beginner",
      icon: "⚡",
      duration: "6 min",
      xpReward: 30,
      coinReward: 12,
      subtitles: [
        "JavaScript runs in browser and Node.js",
        "Use let/const for variables",
      ],
      voiceScript: "Let's learn JavaScript basics.",
      keyPoints: ["Use console.log()", "Prefer const by default"],
      code: "const language = 'JavaScript';\nconsole.log(language);",
      codeExplanation: "console.log prints values in console.",
      output: "JavaScript",
    },
  ]);

  const pyLesson = lessons.find((l) => l.topicId === "py-hello");
  const jsLesson = lessons.find((l) => l.topicId === "js-basics");

  await Quiz.insertMany([
    {
      lessonId: pyLesson._id,
      questions: [
        {
          type: "mcq",
          question: "Python lo output display cheyyadaniki emi use chestam?",
          options: ["printf()", "print()", "output()", "display()"],
          correct: 1,
          explanation: "print() is the correct function in Python.",
          points: 10,
        },
        {
          type: "output",
          question: "Em output vastundi?",
          code: "print('CodeQuest')",
          options: ["CodeQuest", "\"CodeQuest\"", "Error", "codequest"],
          correct: 0,
          explanation: "print displays plain text without quotes.",
          points: 10,
        },
      ],
    },
    {
      lessonId: jsLesson._id,
      questions: [
        {
          type: "mcq",
          question: "JavaScript lo constant variable declaration?",
          options: ["let", "var", "const", "static"],
          correct: 2,
          explanation: "const creates a constant binding.",
          points: 10,
        },
        {
          type: "truefalse",
          question: "console.log() prints output to developer console.",
          options: ["True", "False"],
          correct: 0,
          explanation: "Yes, console.log writes to console output.",
          points: 10,
        },
      ],
    },
  ]);

  console.log("Seed complete");
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
