const bookingController = require('./../controllers/bookingController');



router.use(authController.protect);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
    .route('/')
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking);

router
.route('/:id')
.get(bookingController.getBooking)
.patch(bookingController.updateBooking)
.delete(bookingController.deleteBooking);

