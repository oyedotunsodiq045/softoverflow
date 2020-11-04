const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  solution: {
    type: String,
    trim: true,
    required: [true, 'Please add a solution']
  },
  isSolution: {
    type: Boolean,
    default: false // admin would check this place of (mark as answer) based on number of votes
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema);