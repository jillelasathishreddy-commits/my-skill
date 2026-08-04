const jwt = require("jsonwebtoken");
const env = require("../config/env");

function createToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

module.exports = { createToken };
