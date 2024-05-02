const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: [true, "the wrong"],
    validate: [validator.isEmail, "filed in email is not valid"]
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, "the passowrd is not strong."]
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Manger"],
    default: "User"
  },
  blockers: {
    type: Array,
    default: []
  },
  avatar: {
    type: String,
    default: '../uploads/profile.png'
  }
});


module.exports = mongoose.model("User", UserSchema);
