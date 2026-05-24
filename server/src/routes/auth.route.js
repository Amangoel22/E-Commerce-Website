const express = require('express');
const router = express.Router();

//importing login and register functions from controller
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
