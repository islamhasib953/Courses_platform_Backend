const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/virifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const lessonControllers = require('../controllers/lesson.controller');

router.route('/:id/lessons')
            .get(verifyToken, lessonControllers.getAllCourseLessons)
            .post(
              verifyToken,
              allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR),
              lessonControllers.addCourseLesson);

router.route('/:lessonId')
            .get(verifyToken, lessonControllers.getLessonDetails)
            .patch(verifyToken,  allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR), lessonControllers.updateLesson)
            .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.iNSTRUCTOR), lessonControllers.deleteLesson);

module.exports = router;
