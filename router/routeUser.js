const express = require("express");
const multer = require("multer");
//
const { DataCousrses } = require("../data/courses");
const controler = require("../controllers/controllerUser");
const Course = require("../models/user.model");
const verifyTokken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const ErrorApp = require("../utils/ErrorApp");
//
const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/photos");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}${Math.trunc(
      Math.random() * 1000
    )}.${ext}`;
    return cb(null, fileName);
  }
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(ErrorApp.create("the type file is not valid.", 400, "ERRoR."));
  }
};

const upload = multer({ storage: diskStorage, fileFilter });
router.route("/").get(verifyTokken, allowedTo("Manger"), controler.GetAllUsers);
router.route("/register").post(upload.single("avatar"), controler.register);
router.route("/login").post(controler.Login);
router.get("/:id", controler.GetUserById);
router
  .route("/block/:id")
  .post(verifyTokken, allowedTo("Manger", "User"), controler.blockUser);
module.exports = router;
