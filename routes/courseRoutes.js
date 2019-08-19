const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");

// router.param('id', courseController.checkID);

router
  .route("/top-5-cheap")
  .get(courseController.aliasTopCourses, courseController.getAllCourses);

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
