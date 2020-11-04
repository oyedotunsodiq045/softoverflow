const express = require('express');
const {
  getRatings,
  getRating,
  rateQuestion
} = require('../controllers/ratings');

const Rating = require('../models/Rating');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect
} = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Rating, {
      path: 'question',
      select: 'question categories averageRating'
    }),
    getRatings)
  .post(protect, rateQuestion);

router
  .route('/:id')
  .get(getRating);

module.exports = router;