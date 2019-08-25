const bookingController = require('../controllers/bookingController');
const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

//in the root route just (bookingController.createBookingCheckout,) need to be put inside
router.get(
  '/checkout',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get('/my-courses', authController.protect, viewsController.getMyCourses);

router.get('/overview', authController.isLoggedIn, viewsController.getOverview);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get(
    '/course/:slug', 
authController.isLoggedIn, 
viewsController.getCourse);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
