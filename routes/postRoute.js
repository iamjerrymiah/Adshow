const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRoute');
const likeRouter = require('../routes/likeRoute');


const router = express.Router();

router.use('/:postId/reviews', reviewRouter);
router.use('/:postId/likes', likeRouter);


router 
  .route('/')
  .get(authController.protect, postController.getAllPost) 
  .post(authController.protect,
    reviewController.setPostUserIds,
    postController.createPost);

router.get('/search/:key', authController.protect, postController.postSearch);
router.get('/lazyLoad/:page', authController.protect, postController.lazyLoadPost);
router.get('/post-length', authController.protect, postController.getPostLength);

router.post('/checkout-session/:postId', authController.protect, postController.getCheckoutSession);

router.patch('/bill/:id', authController.protect, postController.trendBillBoard);
router.patch('/reverse-bill/:id', authController.protect, postController.reserveBillBoard);

  router
  .route('/:id')
  .get(authController.protect, postController.getPost)
  .patch(authController.protect,
    postController.uploadPostPhoto, 
    postController.updatePostInfo
  )
  .delete(
    authController.protect,
    postController.deletePost
  );

module.exports = router;  