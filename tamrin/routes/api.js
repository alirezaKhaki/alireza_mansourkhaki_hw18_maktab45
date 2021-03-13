const express = require('express');
const register = require('./register')
const login = require('./login')

const router = express.Router();
/* GET home page. */
router.use('/login', login)
router.use('/register', register);



module.exports = router;