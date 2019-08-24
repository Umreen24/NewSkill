const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// protect all routes after this middleware
// userRouter.use(authController.protect);

userRouter.patch('/updateMyPassword', authController.protect, authController.updatePassword);

userRouter.get('/me', authController.protect, userController.getMe, userController.getUser);
userRouter.patch('/updateMe', authController.protect, userController.resizeUserPhoto, userController.uploadUserPhoto, userController.updateMe);
userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);

// only allow admin access after this middleware
userRouter.use(authController.restrictTo('admin'));

userRouter
  .route('/') 
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;