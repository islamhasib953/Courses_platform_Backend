// let {courses} = require('../data/courses'); // we use it to use data locafolder data
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
  res.json({status: httpStatasyncWrapperusText.SUCCESS,
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

// add new course
const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const newCourse = new Course(req.body);
  await newCourse.save()
  res.status(201).json({status: httpStatusText.SUCCESS,
                        data: {course: newCourse}});
})

// update course
const updateCourse = asyncWrapper(async (req, res, next) => {
  const CourseID = req.params.courseId
  const UpdatedCourse = await Course.updateOne({_id: CourseID}, {$set: {...req.body}});
  if(!UpdatedCourse){
    const error = appError.create("Course not found", 404, httpStatusText.FAIL);
    return next(error);
      }
  res.status(200).json({status: httpStatusText.SUCCESS,
                          data: {course: UpdatedCourse}});
})

//delete course
const deleteCourse = asyncWrapper(async (req, res) => {
  const DeleteCourse = await Course.deleteOne({_id: req.params.courseId});
  res.json({status: httpStatusText.SUCCESS,
            data: null});

})

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse
};