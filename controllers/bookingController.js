const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Booking = require('../models/bookingModel');

// success_url: `${req.protocol}://${req.get('host')}/?course=${
//     req.params.courseId
// }&users=${req.user.id}$price=${course.price}`

//function that creates a new booking in the database
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { course, user, price } = req.query;

  if (!course && !user && !price) return next();
  await this.createBookingCheckout.create({ course, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
