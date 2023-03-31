require("dotenv").config();
const JWT = require("jsonwebtoken");
const Moment = require("moment");

const generateJWTToken = (data) => {
  const token = JWT.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = {
  generateJWTToken,
};
