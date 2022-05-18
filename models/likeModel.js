const mongoose = require('mongoose');
const Post = require('./postModel');

const likeSchema = new mongoose.Schema(
{ 
    like: {
        type: String,
        default: '1',
        required: [true, 'Like can not be empty!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'A like must belong to a post.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A like must belong to a user']
    }
    }, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
);
  

likeSchema.index({ post: 1, user: 1 }, { unique: true }); //use to make user create one like for a post


//populating reviews with user
likeSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'user',
      select: 'name'
    });
    next();
  });




  const Like = mongoose.model('Like', likeSchema);

  module.exports = Like;  