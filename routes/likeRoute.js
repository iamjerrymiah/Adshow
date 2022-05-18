const express = require('express');
const likeController = require('./../controllers/likeController');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(likeController.getAllLikes)
  .post(
    authController.restrictTo('user', 'admin'),
    reviewController.setPostUserIds, 
    likeController.createLike
  );

router
  .route('/:id')
  .get(likeController.getLike)
  .patch(
    authController.restrictTo('admin'),
    likeController.updateLike
  )
  .delete(
    authController.restrictTo('admin'),
    likeController.deleteLike
  );

module.exports = router;
