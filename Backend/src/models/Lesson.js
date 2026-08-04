const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    topicId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    icon: { type: String, required: true },
    duration: { type: String, required: true },
    xpReward: { type: Number, required: true },
    coinReward: { type: Number, required: true },
    subtitles: { type: [String], default: [] },
    voiceScript: { type: String, default: "" },
    keyPoints: { type: [String], default: [] },
    code: { type: String, default: "" },
    codeExplanation: { type: String, default: "" },
    output: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
