const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.get('/logout', authController.logout);
userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword', authController.resetPassword);

userRouter.patch('/updateMyPassword', authController.protect, authController.updatePassword);

userRouter.get('/me', authController.protect, userController.getMe, userController.getUser);

userRouter.patch('/updateMe',
authController.protect,
userController.uploadUserPhoto, 
userController.resizeUserPhoto,
userController.updateMe);

userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);

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