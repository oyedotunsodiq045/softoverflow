const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const {
  clearKey
} = require("../middleware/cache");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    password,
    role
  } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  clearKey(User.collection.collectionName);

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Private
exports.login = asyncHandler(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  // Validate email & login
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  // Check for user
  const user = await User.findOne({
    email
  }).select('+password');

  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // Check if password match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	})

	res.status(200).json({
		success: true,
		data: {}
	});
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    // _id: user._id,
    // name: user.name,
    // email: user.email,
    // role: user.role,
    data: user
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      // role: user.role,
      data: user,
      token,
    });
};