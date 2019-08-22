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

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await tour.findOne({ slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })
    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }
    res.status(200).render('course', {
        title: `${course.name} Tour`,
        tour
    });
});







//this goes at the bottom of the page
exports.getLonginForm = (req, res) => {

}