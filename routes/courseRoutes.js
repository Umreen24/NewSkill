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
  .get(courseController.getAllCourses)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'instructor'),
    courseController.createCourse
  );

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'instructor'),
    courseController.uploadCourseImages,
    courseController.resizeCourseImages,
    courseController.updateCourse
  )
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
