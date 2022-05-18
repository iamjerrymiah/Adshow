const mongoose = require('mongoose');
const Post = require('./postModel');

const reviewSchema = new mongoose.Schema(
{ 
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'Review must belong to a post.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
    }, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
);
  

reviewSchema.index({ post: 1, user: 1 }, { unique: true }); //use to make user create one review for a post


//populating reviews with user
reviewSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'user',
      select: 'username id photo'
    });
    next();
  });




  const Review = mongoose.model('Review', reviewSchema);

  module.exports = Review;  