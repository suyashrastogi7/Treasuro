const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
    unique: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
  