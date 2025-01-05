const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/virifyToken');
const progressControllers = require('../controllers/progrees.controller');

// Get all progress records for the authenticated user
router.route('/')
            .get(verifyToken, progressControllers.getUserProgress)
            .post(verifyToken, progressControllers.upsertProgress);

// Get progress details for a specific lesson
router.route('/:lesson_id')
            .get(verifyToken, progressControllers.getLessonProgress)
            .delete(verifyToken, progressControllers.deleteProgress);


// Mark a specific lesson as completed
router.patch('/:lesson_id/complete', verifyToken, progressControllers.completeLesson);


module.exports = router;
