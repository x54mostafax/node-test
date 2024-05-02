let { DataCousrses } = require("../data/courses");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const WrapMiddle = require("../middleware/async.middleware");
const AppError = require("../utils/ErrorApp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/JwtTokken");
const GetUserById = WrapMiddle(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(AppError.create("the Course is Not found.", 404, "fail"));
  }
  res.json(user);
});

const GetAllUsers = WrapMiddle(async (req, res, next) => {
  const query = req.query;
  const limit = +query.limit || 10;
  const page = +query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  return res.json(users);
});
const Login = WrapMiddle(async (req, res, next) => {
  const { password, email } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    return next(AppError.create("password or email are wrong.", 404, "fail"));
  }
  const validatePassword = await bcrypt.compare(password, oldUser.password);
  if (!validatePassword) {
    return next(AppError.create("password or email are wrong.", 404, "fail"));
  }
  return res.json({
    sucess: true,
    data: {
      token: await generateToken({ email: oldUser.email, id: oldUser._id })
    }
  });
});

const register = WrapMiddle(async (req, res, next) => {
  const { FirstName, password, email, role } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return next(AppError.create("the email is already found."));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    FirstName,
    password: hashedPassword,
    email,
    role,
    avatar: req.file.filename
  });
  newUser.token = await generateToken({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role
  });
  await newUser.save();
  return res.status(201).json({
    sucess: true,
    data: newUser
  });
});

const blockUser = WrapMiddle(async (req, res, next) => {
  const id = req.params.id;
  const blockedUser = await User.findOne({ _id: id });
  const Admin = await User.findOne({ _id: req.currentUser.id });
  const AdminNEW = await User.updateOne(Admin, {
    $set: {
      blockers: Admin.blockers.includes(id)
        ? [...Admin.blockers]
        : [...Admin.blockers, id]
    }
  });
  const Admin2 = await User.findOne({ _id: req.currentUser.id });
  return res.json({
    sucess: true,
    data: {
      Manger: Admin2,
      User: blockedUser,
      Admin: AdminNEW,
      fir: Admin.blockers
    }
  });
});
module.exports = {
  register,
  GetUserById,
  GetAllUsers,
  Login,
  blockUser
};
