const express = require('express');
const register = require('./register')
    // const auth = require('./auth')

const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.send('hi')
})
router.use('/register', register);
// router.use('/aut', aut);


module.exports = router;