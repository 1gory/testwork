const express = require('express');
const router = express.Router();
const { handleLogin, handleLogout, handleCheckAuth } = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT');

router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/check_auth', verifyJWT, handleCheckAuth);

module.exports = router;
