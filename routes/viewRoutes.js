const bookingController = require('../controllers/bookingController');
const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

//in the root route just (bookingController.createBookingCheckout,) need to be put inside
// router.get(
//   '/',
//   bookingController.createBookingCheckout,
//   authController.isLoggedIn,
//   viewController.getOverview
// );

// router.get('/my-course', authController.protect, viewController.getMyTours);

router.get('/overview', viewController.getOverview);
router.get('/course/:slug', viewController.getCourse);
router.get('/login', viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
