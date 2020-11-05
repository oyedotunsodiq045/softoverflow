const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Question = require('../models/Question');
const advancedResults = require('../middleware/advancedResults');

// @desc    Get all Questions
// @route   GET /api/v1/questions
// @access  Public
exports.getQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single Question
// @route   GET /api/v1/questions/:id
// @access  Public
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate({
    path: 'answer',
    select: {
      solution: 1,
      isSolution: 1
    },
  });

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    // _id: question._id,
    // question: question.question,
    // user: question.user,
    data: question
  });
});

// @desc    Ask Question
// @route   POST /api/v1/questions
// @access  Private
exports.askQuestion = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const question = await Question.create(req.body);

  res.status(201).json({
    success: true,
    // _id: question._id,
    // question: question.question,
    // user: question.user,
    data: question
  });
});


