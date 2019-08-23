const Course = require('../models/courseModel');
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getOverview = catchAsync(async (req, res, next) => {
    const courses = await Course.find();

    res.status(200).render('overview', {
        title: 'All Courses',
        courses
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await course.findOne({ slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })
    if (!course) {
        return next(new AppError('There is no course with that name.', 404));
    }
    res.status(200).render('course', {
        title: `${course.name} Course`,
        tour
    });
});


exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account'
    });
};

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
      title: 'Your account'
    });
  };
  
  exports.updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email
      },
      {
        new: true,
        runValidators: true
      }
    );
  
    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser
    });
  });