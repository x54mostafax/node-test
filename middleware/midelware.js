const { body } = require("express-validator");
const validation = () => {
  return [
    body("price").notEmpty().withMessage("The price is Empty"),
    body("title")
      .notEmpty()
      .withMessage("The title is Empty")
      .isLength({ min: 2 })
      .withMessage("The title At least 2")
  ];
};
module.exports = validation;
