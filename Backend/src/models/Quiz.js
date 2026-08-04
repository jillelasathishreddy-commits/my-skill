const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["mcq", "output", "fill", "debug", "truefalse"], required: true },
    question: { type: String, required: true },
    code: { type: String, default: "" },
    options: { type: [String], default: [] },
    correct: { type: Number, required: true },
    explanation: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true, unique: true },
    questions: { type: [questionSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
