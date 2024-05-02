const express = require("express");
const { DataCousrses } = require("../data/courses");
const validation = require("../middleware/midelware");
const controler = require("../controllers/controler");
const Course = require("../models/courses.model");
const verifyTokken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const router = express.Router();

router.get("/user/:id", controler.GetUserById);
router.get(
  "/courses",
  verifyTokken,
  allowedTo("Manger"),
  controler.GetAllCourses
);
router.post("/Name", controler.findUser);
router.route("/course").post(verifyTokken, validation(), controler.CreateUser);
router
  .route("/route")
  .get((req, res) => {
    res.send("Get Man");
  })
  .post((req, res) => {
    res.send("Post Man");
  });
router
  .route("/course/:courseId")
  .delete(verifyTokken, allowedTo("Manger", "Admin"), controler.deleteUser)
  .patch(verifyTokken, allowedTo("Manger", "Admin"), controler.UpdateCourse);

router.get("/user", (req, res) => {
  res.send("hi user");
});

module.exports = router;
