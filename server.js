const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Route files
const auth = require('./routes/auth');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const ratings = require('./routes/ratings');
const users = require('./routes/users');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/questions', questions);
app.use('/api/v1/answers', answers);
app.use('/api/v1/ratings', ratings);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
    .bold
  )
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = server;