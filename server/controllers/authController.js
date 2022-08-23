const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
require('dotenv').config();

const handleLogin = async (req, res) => {
  const { body: { name, password } } = req;
  if (!name || !password) return res.status(401).json({ message: 'Username and password are required' });
  const foundUser = await db.User.findOne({
    where: { name },
  });

  const unauthorizedMessage = { message: 'Incorrect username or password' };
  if (!foundUser) return res.status(401).json(unauthorizedMessage);
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { name: foundUser.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    res.cookie('jwt', accessToken, { maxAge: 24 * 60 * 60 * 1000 });
    return res.json({});
  }

  return res.status(401).json(unauthorizedMessage);
};

const handleLogout = (req, res) => {
  res.clearCookie('jwt');
  return res.sendStatus(200);
};

const handleCheckAuth = (req, res) => res.sendStatus(200);

module.exports = { handleLogin, handleLogout, handleCheckAuth };
