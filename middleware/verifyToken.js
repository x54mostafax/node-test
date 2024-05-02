const jwt = require("jsonwebtoken");
const AppError = require("../utils/ErrorApp");
const WrapMiddle = require("./async.middleware");
const verifyTokken = WrapMiddle(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ msg: "token is requird." });
  }
  const token = auth.split(" ")[1];
  const currentUser = await jwt.verify(token, process.env.Jwt_Secret_Key);
  req.currentUser = currentUser;
  next();
});
module.exports = verifyTokken;
