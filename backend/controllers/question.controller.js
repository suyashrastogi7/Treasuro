const Question = require("../models/question_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

// async await
// const getQuestionsAsyncAwait = async (_, res) => {
//   try {
//     const questions = await Question.find();
//     const questionTruncated = questions.map(({ question, answer, level }) => {
//       return { question, answer, level };
//     });
//     res.status(200).json({
//       questionTruncated,
//     });
//   } catch (error) {
//     console.log(error.message);
//     showError(error, res);
//   }
// };

// promise
// const getQuestions = (_, res) => {
//   Question.find()
//     .then((questions) => {
//       const questionTruncated = questions.map(({ question, answer, level }) => {
//         return { question, answer, level };
//       });
//       res.status(200).json({
//         questions: questionTruncated,
//       });
//     })
//     .catch((error) => {
//       console.log(error.message);
//       showError(error, res);
//     });
// };

const getQuestion = (req, res) => {
  Question.findOne({ level: req.user.level })
    .select("-_id")
    .select("-answer")
    .select("-__v")
    .then((question) => {
      return res.status(200).json({
        question,
      });
    })
    .catch((error) => {
      console.log(error.message);
      showError(error, res);
    });
};

const createQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { question, answer, level } = req.body;

  try {
    // create new question
    const newQuestion = new Question({
      question,
      answer,
      level,
    });

    await newQuestion.save();

    return res.status(200).json({
      question,
      answer,
      level,
    });
  } catch (error) {
    showError(error, res);
  }
};

const answerQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }
  const { answer } = req.body;
  let user = req.user;
  try {
    if (user.attempts > 0) {
      const question = await Question.findOne({ level: user.level });
      if (answer === question.answer) {
        user.level++;
        user.score += 10;
        user.timestamp = Date.now();
        await user.save();
        return res.status(200).json({ result: "Correct" });
      }
      user.attempts--;
      user.score -= 2;
      await user.save();
      return res.status(200).json({ result: "Incorrect" });
    } else return res.status(400).json({ result: "No Attempts Left" });
  } catch (error) {
    showError(error, res);
  }
};
module.exports = {
  getQuestion,
  createQuestion,
  answerQuestion,
};
