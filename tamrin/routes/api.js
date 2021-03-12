const express = require('express');
const register = require('./register')
const auth = require('./auth')

const router = express.Router();
/* GET home page. */
router.use('/resgiter', register);
router.use('/aut', aut);


module.exports = router;