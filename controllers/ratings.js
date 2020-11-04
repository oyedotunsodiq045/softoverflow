const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rating = require('../models/Rating');
const Question = require('../models/Question');

// @desc    Get ratings
// @route   GET /api/v1/ratings
// @route   GET /api/v1/questions/:questionId/ratings
// @access  Public
exports.getRatings = asyncHandler(async (req, res, next) => {
  if (req.params.questionId) {
    const ratings = await Rating.find({
      question: req.params.questionId
    });

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  } else {
    res.status(200).json(res.advancedResults)
  }
});

// @desc    Get single Rating
// @route   GET /api/v1/ratings/:id
// @access  Public
exports.getRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id).populate({
    path: 'question',
    select: {
      question: 1,
      categories: 1,
      averageRating: 1
    },
  });

  if (!rating) {
    return next(
      new ErrorResponse(`Rating not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: rating
  });
});

// @desc    Up-vote or Down-vote Question
// @route   POST /api/v1/questions/:questionId/ratings
// @access  Private
exports.rateQuestion = asyncHandler(async (req, res, next) => {
  req.body.question = req.params.questionId;
  // Add user to req.body
  req.body.user = req.user.id;

  const question = Question.findById(req.params.questionId);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.questionId}`, 404)
    );
  }

  const rating = await Rating.create(req.body);

  res.status(201).json({
    success: true,
    data: rating
  });
});