const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { validationSchema } = require('../middlewares/validationschema');

// make all same api but different method in same route
router.route('/api/courses')
            .get(courseController.getAllCourses)
            .post(
              validationSchema(),
              courseController.addCourse);

// git single course & update course
router.route('/api/courses/:courseId')
            .get(courseController.getSingleCourse)
            .patch(courseController.updateCourse)
            .delete(courseController.deleteCourse);



module.exports = router;
