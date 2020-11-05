const express = require('express');
const {
  getUsers,
  getUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(User), getUsers);

router
  .route('/:id')
  .get(getUser);

module.exports = router;