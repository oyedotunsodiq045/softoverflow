const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Please add a question'],
    minlength: [5, 'Question can not be less than 5 characters'],
    maxlength: [1000, 'Question can not be more than 500 characters']
  },
  categories: {
    type: [String], // Array of Strings
    required: true,
    enum: [
      'Java',
      'Python',
      'Javascript',
      'PHP',
      'Go',
      'Ruby',
      'CSharp',
      'Dart',
      'Flutter',
      'IOS',
      'Android',
      'Ionic',
      'Frontend',
      'Backend',
      'Database',
      'Programming',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    // min: [1, 'Rating must be at least 1'],
    // max: [10, 'Rating can not be more than 10']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

// Reverse populate with virtuals
QuestionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question',
  justOne: false
});

module.exports = mongoose.model('Question', QuestionSchema);