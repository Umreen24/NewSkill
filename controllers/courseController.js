const Course = require('./../models/courseModels');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTopCourses = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllCourses = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Course.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const courses = await features.query;

  //  const query = Course.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(200).json({
    data: {
      course
    }
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      course: newCourse
    }
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
