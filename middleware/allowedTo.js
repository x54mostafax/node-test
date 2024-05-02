const AppError = require("../utils/ErrorApp");
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(AppError.create("the role is not authrized.", 401));
    }
    next();
  };
};
