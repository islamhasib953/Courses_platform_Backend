require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const corse = require('cors');
const httpStatusText = require('./utils/httpStatusText');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());


//connect to mongodb
const url = process.env.MONGO_URL;
mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB using Mongoose');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(corse());

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
const enrollmentsRouter = require('./routes/enrollments.route');
const lessonsRouter = require('./routes/lesson.route');
const courseLessonsRouter = require('./routes/lesson.route');
app.use('/api/courses', coursesRouter); //localhost / ==> /api/courses
app.use('/api/users', usersRouter);  //localhost / ==> /api/users
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/courselessons', courseLessonsRouter);
app.use('/api/lessons', lessonsRouter);

//global midderware for not found routes
app.all('*', (req, res) => {
  return res.status(404).json({status: httpStatusText.ERROR, data: {message: "this resource not found"}});
});


//use midderware asyncWarpper
//global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})

app.listen(process.env.PORT || 5000, (err, data)=> {
  console.log("listening on port 5000");
})



