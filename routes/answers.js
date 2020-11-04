const express = require('express');
const {
  getAnswers,
  getAnswer,
  answerQuestion,
} = require('../controllers/answers');

const Answer = require('../models/Answer');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect
} = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Answer, [{
      path: 'question',
      select: 'question categories averageRating'
    }, {
      path: 'user',
      select: 'name email role',
    }]),
    getAnswers)
  .post(protect, answerQuestion);

router
  .route('/:id')
  .get(getAnswer);

module.exports = router;