const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.getOverviewPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('overview', { 
        title: 'ADshow || Advertise your dream',
        posts,
        bills
    });
});


exports.getOnePost = catchAsync(async (req, res, next) =>{
    const post = await Post.findOne({ slug: req.params.slug }).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    // const userProfile = await User.findOne({ _id: req.params.id });

    if (!post) {
        return next();
    };

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('single-post', {
        title: `${post.headline.split('-_-_-_').shift()}`,
        post
    });
});



exports.getAccountPost = catchAsync(async (req, res, next) => {
    const userPost = await Post.findOne({ hash: req.params.hash }).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);
 
    if (!userPost) {
        return next();
    };

     // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('dash-single', {
        title: `${userPost.headline.split('-_-_-_').shift()}`,
        userPost
    });
});



exports.getAccount = catchAsync(async (req, res, next)=> {
    //Get posts by a specific user
    const userPost = await Post.find({ user: req.user.id }).sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    // const userPostIDs = userPost.map(el => el.post);
    // const posts = await Post.find({ _id: { $in: userPostIDs } })

    if(userPost.length === 0) {
        res.status(200).render('no-account', {
            title: 'Your account'
        });
    }else {
        res.status(200).render('account', {
            title: 'Your account',
            userPost 
        });
    }
});




exports.getStripePost = catchAsync(async (req, res, next) => {
    const stripePost = await Post.findOne({ _id: req.params.id });
 
    if (!stripePost) {
        return next();
    };

     // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('stripe-Invoice', {
        title: `${stripePost.headline.split('-_-_-_').shift()}`,
        stripePost
    });
});






//Search viewing function
exports.postSearchPage = catchAsync(async (req, res, next) =>{
    const posts = await Post.find({
        '$or': [
          {headline: {$regex: req.params.key}}
        ]
      }).sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('overview', { 
        title: 'ADshow || Advertise your dream',
        posts,
        bills
    });
});


exports.getBillboard = catchAsync(async(req, res, next) => {
    const bills = await Post.aggregate([{ $sample: { size: 15 } }]);

    res.status(200).render('billboard', {
        title: 'Trending Billboard',
        bills
    })
});

exports.adminGetBillboardPosts = catchAsync(async(req, res, next) => {
    const bills = await Post.find();

    res.status(200).render('admin-get-billboard', {
        title: 'Manage Billboard',
        bills
    })
});

exports.adminGetAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find().sort({_id: -1});

    res.status(200).render('admin-get-users', {
        title: 'Manage Users',
        users
    });
});


exports.getAboutPage = (req, res) => {
    res.status(200).render('about-page', {
        title: 'About ADshow'
    })
};

exports.getContactPage = (req, res) => {
    res.status(200).render('contact-page', {
        title: 'Contact ADshow'
    })
};

exports.getLoginForm = (req, res) =>{
    res.status(200).render('login', {
        title: 'log into your account'
    });
};


exports.getSignupForm = (req, res) =>{
    res.status(200).render('signup', {
        title: 'Create your account'
    });
};


exports.getSettingPage = (req, res)=> {
    res.status(200).render('settings', {
        title: 'Settings'
    })
};


exports.getCreatePostPage = (req, res, next)=> {
    res.status(200).render('create-post', {
        title: 'Post a video or Image'
    })
};



exports.getCreateVidImgPage = catchAsync(async (req, res, next)=> {
    //Get posts by a specific user
    const updatedPost = await Post.find({ user: req.user.id }).sort({_id: -1});

    res.status(200).render('img-vid', {
        title: 'Post a video or Image',
        updatedPost
    });
});












//category rendering
exports.getArtsPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('arts-cate', { 
        title: 'ADshow || Arts',
        posts,
        bills
    });
});


exports.getArchConstruct = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('arch-construct', { 
        title: 'ADshow || Architecture and Construction',
        posts,
        bills
    });
});


exports.getBusinessPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('business-cate', { 
        title: 'ADshow || Business',
        posts,
        bills
    });
});


exports.getEduTrain = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('edu-train', { 
        title: 'ADshow || Education and Training',
        posts,
        bills
    });
});


exports.getEntertainment = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('entertain-cate', { 
        title: 'ADshow || Entertainment',
        posts,
        bills
    });
});


exports.getEngineering = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('engine-cate', { 
        title: 'ADshow || Engineering',
        posts,
        bills
    });
});


exports.getHealthSci = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('health-sci', { 
        title: 'ADshow || Health Science',
        posts,
        bills
    });
});


exports.getInfoTech = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('info-tech', { 
        title: 'ADshow || Information Technology',
        posts,
        bills
    });
});


exports.getManufacturingPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('manufacturing-cate', { 
        title: 'ADshow || Manufacturing',
        posts,
        bills
    });
});


exports.getMarketingPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('marketing-cate', { 
        title: 'ADshow || Marketing',
        posts,
        bills
    });
});



exports.getSoftDev = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('soft-dev', { 
        title: 'ADshow || Software Development',
        posts,
        bills
    });
});


exports.getOthersPage = catchAsync(async (req, res, next) =>{
    //(1 get all posts from post collection
    const posts = await Post.find().sort({_id: -1}).populate([
        {
            path: 'reviews'
        },
        {
            path: 'likes'
        }
    ]);

    const bills = await Post.aggregate([{ $sample: { size: 6 } }]);

    //(2 Build template
    //(3 Render template
    res.status(200).render('others-cate', { 
        title: 'ADshow || Others',
        posts,
        bills
    });
});













// exports.getOneUser = catchAsync(async (req, res, next) => {
//     const userProfile = await User.findOne({ _id: req.params.id }).populate({ 
//         path: 'post', 
//         fields: 'headline id photo description category' 
//     });

//     if (!userProfile) {
//         return next();
//     }

//     // 2) Build template
//     // 3) Render template using data from 1)
//     res.status(200).render('user-dashboard', {
//         title: `${userProfile.username}`,
//         userProfile
//     });
// });