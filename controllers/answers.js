const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// @desc    Get all Answers
// @route   GET /api/v1/answers
// @route   GET /api/v1/questions/:questionId/answers
// @access  Public
exports.getAnswers = asyncHandler(async (req, res, next) => {
  if (req.params.questionId) {
    const answers = await Answer.find({
      question: req.params.questionId
    }).populate([{
      path: 'question',
      select: {
        question: 1,
        categories: 1,
        averageRating: 1
      },
    }, {
      path: 'user',
      select: 'name email role',
    }]).cache({
      time: 10
    });

    return res.status(200).json({
      success: true,
      count: answers.length,
      data: answers
    });
  } else {
    res.status(200).json(res.advancedResults)
  }
});

// @desc    Get single Answer
// @route   GET /api/v1/answers/:id
// @access  Public
exports.getAnswer = asyncHandler(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id).populate({
    path: 'question',
    select: {
      question: 1,
      categories: 1,
      averageRating: 1
    },
  });

  if (!answer) {
    return next(
      new ErrorResponse(`Answer not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: answer
  });
});

// @desc    Answer Question
// @route   POST /api/v1/questions/:questionId/answers
// @access  Private
exports.answerQuestion = asyncHandler(async (req, res, next) => {
  req.body.question = req.params.questionId;
  // Add user to req.body
  req.body.user = req.user.id;

  const question = Question.findById(req.params.questionId);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.questionId}`, 404)
    );
  }

  // console.log(question)
  // console.log(req.body.user)

  // Author should not provide answer to his/her question
  // if (question.user.toString() === req.user.id) {
  //   return next(
  //     new ErrorResponse(`User ${req.user.id} is not authorized to add an answer to his/her own question ${question._id}`, 401)
  //   );
  // }

  const answer = await Answer.create(req.body);

  res.status(201).json({
    success: true,
    data: answer
  });
});