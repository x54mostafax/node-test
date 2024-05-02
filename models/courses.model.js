const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
