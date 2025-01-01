const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { validationSchema } = require('../middlewares/validationschema');

// make all same api but different method in same route
router.route('/')
            .get(courseController.getAllCourses);

module.exports = router;
