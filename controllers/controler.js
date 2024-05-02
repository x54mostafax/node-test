let { DataCousrses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Course = require("../models/courses.model");
const WrapMiddle = require("../middleware/async.middleware");
const AppError = require("../utils/ErrorApp");

const GetUserById = WrapMiddle(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(AppError.create("the Course is Not found.", 404, "fail"));
  }
  res.json(course);
});
const GetAllCourses = WrapMiddle(async (req, res, next) => {
  const query = req.query;
  const limit = +query.limit || 10;
  const page = +query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  return res.json(courses);
});

const findUser = WrapMiddle(async (req, res, next) => {
  const user = DataCousrses.find(req.body);
  if (!user) {
    return next(AppError.create("the Course is Not found.", 404, "fail"));
  }
  return res.status(200).json(user);
});

const CreateUser = WrapMiddle(async (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  return res.status(201).json(newCourse);
});

const deleteUser = WrapMiddle(async (req, res, next) => {
  const coursedel = await Course.deleteOne({ _id: req.params.courseId });
  if (!coursedel.deletedCount) {
    return next(AppError.create("the course is been deleted.", 400, "fail"));
  }
  return res.status(400).json(coursedel);
});
const UpdateCourse = WrapMiddle(async (req, res, next) => {
  const courseUpd = await Course.updateOne(
    { _id: req.params.courseId },
    { $set: { ...req.body } }
  );
  if (courseUpd.acknowledged) {
    return res.status(400).json({
      success: false,
      msg: { ...courseUpd, reason: "the keys is wrong." }
    });
  }
  return res.status(200).json({ success: true, msg: { ...courseUpd } });
});
module.exports = {
  findUser,
  CreateUser,
  GetUserById,
  deleteUser,
  GetAllCourses,
  UpdateCourse
};
