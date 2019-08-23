const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('./../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Booking = require('../models/bookingModel');


// const AppError = require('../utils/appError');

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

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  const session = await stripe.checkout.sessions.create({
    payment_method_type: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/course/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${course.name} Course`,
        description: tour.summary,
        images: [/*place a img url for what needs to be seen at checkout*/],
        amount: course.price * 100,
        currency: 'usd',
        quantity: 1,
      }
    ]
  });
  res.status(200).json({
    status: 'success',
    session
  })
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
