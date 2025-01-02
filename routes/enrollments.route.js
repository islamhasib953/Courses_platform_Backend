const express = require('express');

const enrollmentController = require('../controllers/enrollment.controller');
const verifyToken = require('../middlewares/virifyToken');

const router = express.Router();

router.route('/')
            .get(verifyToken, enrollmentController.getAllEnrollments)
            .post(verifyToken, enrollmentController.enrollInCourse);

module.exports = router;
