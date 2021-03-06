const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup); 
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword); 

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe); //router for user updating themselves
router.delete('/deleteMe', userController.deleteMe);

//restrict all routes to admin after this middleware
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
