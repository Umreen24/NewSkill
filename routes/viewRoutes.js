const bookingController = require('../controllers/bookingController');



//in the root route just (bookingController.createBookingCheckout,) need to be put inside
router.get(
    '/',
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewsController.getOverview
);

router.get('/my-course', authController.protect, viewsController.getMyTours);