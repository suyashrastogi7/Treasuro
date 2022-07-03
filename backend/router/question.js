const router = require("express").Router();
const { check } = require("express-validator");
const requireLogin = require("../middlewares/requireLogin");
const checkIfActive = require("../middlewares/checkIfActive");

// controllers
const {
    getQuestion,
    createQuestion,
    answerQuestion,
} = require("../controllers/question.controller");

/**
 * @route   GET ALL /api/question
 * @access  private
 * @desc    get list of all question
 */
// router.get("/getall", getQuestions);

/**
 * @route   GET /api/question/getone
 * @access  private
 * @desc    get a question
 */
router.get("/getone", getQuestion);

/**
 * @route   POST /api/question
 * @access  private
 * @desc    create a question
 */
router.post(
    "/",
    [
        check("question", "question is required").exists(),
        check("answer", "answer is required").exists(),
        check("level", "level is required").exists(),
    ],
    createQuestion
);

/**
 * @route   POST /api/question
 * @access  private
 * @desc    answer a question
 */
router.post(
    "/ans",
    check("answer", "answer is required").exists(),
    answerQuestion
);

module.exports = router;
