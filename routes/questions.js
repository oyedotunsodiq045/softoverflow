const express = require('express');
const {
  getQuestions,
  getQuestion,
  askQuestion,
} = require('../controllers/questions');

const Question = require('../models/Question');

// Include other resource routers
const answerRouter = require('./answers');
const ratingRouter = require('./ratings');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const {
  protect
} = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:questionId/answers', answerRouter);
router.use('/:questionId/ratings', ratingRouter);

router
  .route('/')
  // .get(advancedResults(Question, 'answers'), getQuestions)
  .get(advancedResults(Question), getQuestions)
  .post(protect, askQuestion);

router
  .route('/:id')
  .get(getQuestion);

module.exports = router;