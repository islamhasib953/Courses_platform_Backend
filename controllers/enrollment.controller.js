const Enrollment = require('../models/enrollment.mode');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

// get All enrollments From Database Using Course Model
const getAllEnrollments = asyncWrapper(async(req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const enrollments = await Enrollment.find({ user_id: req.verifyUser.id }).populate('course_id').limit(limit).skip(skip);
  res.json({status: httpStatusText.SUCCESS,
            data: {enrollments}});
})

const enrollInCourse = asyncWrapper(async(req, res, next) => {
  const { course_id } = req.body;
  const course = await Course.findById(course_id);
  if (!course){
    const error = appError.create("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  const newenrollment = new Enrollment(req.body);
  await newenrollment.save();
  res.status(201).json({status: httpStatusText.SUCCESS,
                        data: {enrollment: newenrollment}});
})
module.exports = {
  enrollInCourse,
  getAllEnrollments
};