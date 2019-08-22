const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');

const authController = require('../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

// router.param('id', courseController.checkID);

router.use('/:courseId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(courseController.aliasTopCourses, courseController.getAllCourses);

router
  .route('/')
  .get(authController.protect, courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse, courseController.resizeCourseImages)
  .delete(courseController.deleteCourse)
  .patch(courseController.updateCourse)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'instructor'),
    courseController.deleteCourse
  );

// router
//   .route('/:courseId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
