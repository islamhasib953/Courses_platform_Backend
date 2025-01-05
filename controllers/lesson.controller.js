const Lesson = require('../models/lesson.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Course = require('../models/course.model');
const appError = require('../utils/appError');


// Get Lessons for a Course
const getAllCourseLessons = asyncWrapper(async(req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const lessons = await Lesson.find({ course_id: req.params.id }).limit(limit).skip(skip);
  res.json({status: httpStatusText.SUCCESS,
            data: {lessons}});
})

// Add Lesson
const addCourseLesson = asyncWrapper(async (req, res, next) => {

  courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course){
    const error = appError.create("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  const { title, video_url, content } = req.body;
  if (!title ||!video_url ||!content) {
    const error = appError.create("Title, Video URL, and Content are required", 400, httpStatusText.FAIL);
    return next(error);
  }
  const newlesson = new Lesson({
    course_id: courseId,
    title,
    video_url,
    content,
  });
  await newlesson.save();
  res.status(201).json({status: httpStatusText.SUCCESS,
                        data: {lesson: newlesson}});
});


// Get Lesson Details
const getLessonDetails = asyncWrapper(async (req, res, next) => {
  lessonId = req.params.lessonId;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson){
      const error = appError.create("Lesson not found", 404, httpStatusText.FAIL);
      return next(error);
    }
    res.status(201).json({status: httpStatusText.SUCCESS,
            data: {lesson}});
});

// Update Lesson
const updateLesson = asyncWrapper(async (req, res, next) => {
  const UpdatedLesson = await Lesson.updateOne({_id: lessonId}, {$set: {...req.body}});
  if(!UpdatedLesson){
    const error = appError.create("Lesson not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.status(200).json({status: httpStatusText.SUCCESS,
                          data: {course: UpdatedLesson}});
});

//Delete Lesson
const deleteLesson = asyncWrapper(async (req, res, next) => {
  const deletedLesson = await Lesson.findByIdAndDelete({_id: lessonId});
  if(!deletedLesson){
    const error = appError.create("Lesson not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.status(201).json({status: httpStatusText.SUCCESS,
            data: null});

});
module.exports = {
  getAllCourseLessons,
  addCourseLesson,
  getLessonDetails,
  updateLesson,
  deleteLesson
}