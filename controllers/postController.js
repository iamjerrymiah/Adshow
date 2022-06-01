const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const multer = require('multer');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
// const sharp = require('sharp');


exports.getCheckoutSession = catchAsync(async (req, res, next) =>{
    const post = await Post.findById(req.params.postId);

    //Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/${post.id}`,
        cancel_url: `${req.protocol}://${req.get('host')}/account`, 
        customer_email: req.user.email,
        client_reference_id: req.params.postId,
        line_items: [
            {
              name: post.headline.split('-_-_-_').shift(),
              images: [`${req.protocol}://${req.get('host')}/images/posts/${post.photo}`], 
              amount: 10 * 100,
              currency: 'usd',
              quantity: 1
            }
          ]
        });
    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        //  session
        url: session.url
    });
});



const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts');
  },
  filename: (req, file, cb) => {
    cb(null, `post-${req.params.id}-${Date.now()}` + file.originalname);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only videos and images.', 400), false);
  }

};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostPhoto = upload.single('photo'); //photo is the name of the fieldHTML 



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => { //looping through allowedFields object
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


exports.updatePostInfo = catchAsync(async (req, res, next) => {
  // 1) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body);
  if (req.file) filteredBody.photo = req.file.filename; //for the uploaded image, saving image to the database

  // 2) Update user document
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      post: updatedPost
    }
  });
});


exports.trendBillBoard = catchAsync(async (req, res, next) => {
  await Post.findByIdAndUpdate(req.params.id, { billboard: true });
  await Post.findByIdAndUpdate(req.params.id, { billboardChangedAt: Date.now()});
  await Post.findByIdAndUpdate(req.params.id, { billboardExpiresAt: Date.now() + 6.048e+8 });

  res.status(204).json({
    status: 'success',
    data: null
  });
});


exports.reserveBillBoard = catchAsync(async (req, res, next) =>{
  await Post.findByIdAndUpdate(req.params.id, { billboard: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});


//API for HomePage lazy loading
exports.lazyLoadPost = catchAsync(async (req, res, next) =>{
  let page = parseInt(req.params.page);
  let postAmount = 3;

  const posts = await Post.find()
    .sort({_id: -1})
    .populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]).skip(page).limit(postAmount)

    res.status(200).json({
      posts
    })
});


exports.getPostLength = catchAsync(async (req, res, next) => {
  const post = await Post.find();

  res.status(200).json({
    length: post.length
  })
});




//Search Functionality
exports.postSearch = catchAsync(async (req, res, next) =>{
  const searched = await Post.find(
      {
      '$or': [
        {headline: {$regex: req.params.key}},
        {category: {$regex: req.params.key}}
      ]
    })

    res.status(200).json({
      status: 'success',
      results: searched.length,
      data: {
        searched
      }
    });
});




exports.getAllPost = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: 'reviews'});
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);