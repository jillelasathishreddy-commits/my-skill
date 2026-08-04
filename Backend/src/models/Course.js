const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    description: { type: String, required: true },
    gradient: { type: String, required: true },
    textColor: { type: String, required: true },
    enrolled: { type: String, default: "0" },
    difficulty: { type: Number, min: 1, max: 4, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
