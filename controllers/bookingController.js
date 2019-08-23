const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const factory = require('./handlerFactory');
const Booking = require('../models/booksModels');
const Course = require("./../models/courseModel");
const catchAsync = require("../utils/catchAsync");



exports.getheckoutSession = catchAsync(async(req, res, next) =>{

  const course = await Course.findById(req.params.courseId);

  const session = await stripe.checkout.session.create({
    payment_method_type: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?course=${
            req.params.courseId
    }&user=${req.user.id}$price=${course.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/course/${course.slug}`,
    custumer_email: req.user.email,
    client_reference_id: req.params.courseId,
    line_items: [
      {
        name: `${course.name} Course`,
        description: course.summary,
        images: ['https://www.natours.dev/img/course/bee-cover.jpg'],
        amount: course.price *100,
        currency: 'usd',
        quantity: 1


    }

    ]


  });
  res.status(200).json({
    status: 'success',
    session

  })
});



 //function that creates a new booking in the database
 exports.createBookingCheckout = catchAsync(async(req, res, next) =>{
    const {course, user, price} = req.query;
     
    if(!course && !user && !price) return next();
    
    await this.createBookingCheckout.create({course, user, price})

   res.redirect(req.originalUrl.split('?')[0])

 });

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAllBooking(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);