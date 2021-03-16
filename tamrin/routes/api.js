const express = require('express');
const register = require('./register');

const login = require('./login');
const dashbord = require('./dashboard');
const router = express.Router();
/* GET home page. */
router.use('/', login);
router.use('/login', login);
router.use('/register', register);
router.use('/dashboard', dashbord);


module.exports = router;