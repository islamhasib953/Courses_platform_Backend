const {validationResult} = require('express-validator');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

// get All courses From Database Using Course Model
const getAllCourses = asyncWrapper(async(req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, {__v:0}).limit(limit).skip(skip);
  res.json({status: httpStatusText.SUCCESS,
            data: {courses:courses}});
})


// get single course
const getSingleCourse = asyncWrapper(
  async (req, res, next) =>{
  const course = await Course.findById(req.params.courseId);
  if (!course){
    const error = appError.create("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({status: httpStatusText.SUCCESS,
            data: {course: course}});
  }
)

module.exports = {
  getAllCourses,
  getSingleCourse
};