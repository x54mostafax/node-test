const jwt = require("jsonwebtoken");
module.exports = async payload => {
  const token = await jwt.sign(payload, process.env.Jwt_Secret_Key, {
    expiresIn: "90d"
  });
  return token;
};
