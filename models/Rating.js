const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  rating: {
    type: Number,
    // min: 1,
    // max: 10,
    required: [true, 'Please add a rating']
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
});

// Prevent user from submitting more than one rating per question
RatingSchema.index({
  question: 1,
  user: 1
}, {
  unique: true
});

// Static method to get avg of rating and save
RatingSchema.statics.getAverageRating = async function (questionId) {
  // console.log('Calculating avg rating...'.blue);
  const obj = await this.aggregate([{
      $match: {
        question: questionId
      }
    },
    {
      $group: {
        _id: '$question',
        averageRating: {
          $avg: '$rating'
        }
      }
    }
  ]);

  try {
    await this.model('Question').findByIdAndUpdate(questionId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Call averageRating after save
RatingSchema.post('save', function () {
  this.constructor.getAverageRating(this.question);
});

// Call averageRating before remove
RatingSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.question);
});

module.exports = mongoose.model('Rating', RatingSchema);