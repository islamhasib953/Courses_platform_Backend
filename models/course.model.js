const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  description: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 1024
  },
  price: {
    type: Number,
    required: true,
    min: 10,
  },
  category: {
    type: String,
    required: true,
    enum: ['web development', 'mobile development', 'AI', 'Data science']
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Course', courseSchema);