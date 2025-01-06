const Progress = require('../models/progress.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');

// Get Progress for a User
const getUserProgress = asyncWrapper(async (req, res) => {
  const userId = req.verifyUser.id; // Assuming user is authenticated and ID is in `req.user`
  const progress = await Progress.find({ user_id: userId }).populate('lesson_id');
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { progress },
  });
});

// Add or Update Progress
const upsertProgress = asyncWrapper(async (req, res) => {
  const { lesson_id, status } = req.body;
  const userId = req.verifyUser.id;

  if (!lesson_id || !status) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: 'Lesson ID and status are required',
    });
  }

  const progress = await Progress.findOneAndUpdate(
    { user_id: userId, lesson_id },
    { status, completed_at: status === 'completed' ? new Date() : null },
    { new: true, upsert: true }
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { progress },
  });
});

// Mark Lesson as Completed
const completeLesson = asyncWrapper(async (req, res) => {
  const { lesson_id } = req.params;
  const userId = req.verifyUser.id;

  const progress = await Progress.findOneAndUpdate(
    { user_id: userId, lesson_id },
    { status: 'completed', completed_at: new Date() },
    { new: true, upsert: true }
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: 'Lesson marked as completed',
    data: { progress },
  });
});

// Get Progress for a Specific Lesson
const getLessonProgress = asyncWrapper(async (req, res) => {
  const lesson_id = req.params.lesson_id;

  const progress = await Progress.find({ lesson_id }).populate('user_id');
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { progress },
  });
});

// Delete Progress
const deleteProgress = asyncWrapper(async (req, res) => {
  const lesson_id = req.params.lesson_id;
  const userId = req.verifyUser.id;

  await Progress.findOneAndDelete({ user_id: userId, lesson_id });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: 'Progress deleted successfully',
  });
});

module.exports = {
  getUserProgress,
  upsertProgress,
  completeLesson,
  getLessonProgress,
  deleteProgress,
};
