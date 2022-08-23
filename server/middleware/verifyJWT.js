const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(401);
  const token = cookies.jwt;
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err) => {
      if (err) return res.sendStatus(401);
      return next();
    },
  );
};

module.exports = verifyJWT;
