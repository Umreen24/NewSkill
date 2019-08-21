const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");

const authController = require("../controllers/authController");

// router.param('id', courseController.checkID);

router
  .route("/top-5-cheap")
  .get(courseController.aliasTopCourses, courseController.getAllCourses);

router
  .route("/")
  .get(authController.protect, courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(authController.protect, authController.restrictTo('admin', 'instructor'), courseController.deleteCourse);

module.exports = router;
