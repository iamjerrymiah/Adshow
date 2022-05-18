const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('../models/userModel');

const postSchema = new mongoose.Schema({
    headline: {
        type: String,
        trim: true,
        required: [true, 'A post must have a headline']
    },
    category:{
        type: String,
        trim: true,
        required: [true, 'A post must belong to a category']
    },
    photo: {
        type: String,
        required: [true, 'Post a Video or image'],
        default: 'vitualpost.jpg'
    },
    hash: String,
    slug: String,
    billboard: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    route: {
        type: String,
        default: 'Post metric'
    },
    hashRoute: {
        type: String,
        default: '#73676betj26srg3'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Post must belong to a user']
    },
    billboardChangedAt: Date,
    billboardExpiresAt: Date,
},  {
    toJSON: { virtuals:true },
    toObject: { virtuals:true }
});


// ,
//     description:{
//         type: String,
//         trim: true,
//         required: [true, 'A post must have a description'] 
//     }


postSchema.index({ slug: 1 });
postSchema.index({ hash: 1 });



// DOCUMENT MIDDLEWARE: runs before .save() and .create()
postSchema.pre('save', function(next) {
    this.headline = this.headline + '-_-_-_' + this.createdAt;

    next();
});

postSchema.pre('save', function(next) {
    this.hash = slugify(this.route + this.hashRoute + this.id + this.category, { lower: true });
    next();
});

postSchema.pre('save', function(next) {
    this.slug = slugify(this.headline, { lower: true });
    next();
});


postSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'post',
    localField: '_id'         
});

postSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'post',
    localField: '_id'         
});



// QUERY MIDDLEWARE
// postSchema.pre(/^find/, function(next) {
//     this.populate({
//       path: 'users',
//       select: '-__v -passwordChangedAt'
// });
  
//     next();
// });

//populating posts with user
postSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'user',
      select: 'username id photo email bio companyName website phoneNumber address'
    });
    next();
  });

//   postSchema.pre(/^aggregate/, function(next) {
//     this.populate({
//       path: 'user',
//       select: 'username id photo'
//     });
//     next();
//   });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
