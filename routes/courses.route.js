const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { validationSchema } = require('../middlewares/validationschema');
const verifyToken = require('../middlewares/virifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');

router.route('/')
            .get(verifyToken, courseController.getAllCourses)
            .post(
              verifyToken,
              allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR),
              validationSchema(),
              courseController.addCourse);

router.route('/:courseId')
            .get(verifyToken, courseController.getSingleCourse)
            .patch(verifyToken,  allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR), courseController.updateCourse)
            .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR), courseController.deleteCourse);

module.exports = router;
