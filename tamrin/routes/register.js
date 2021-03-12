const express = require('express');
const user = require('../model/user')
const url = require('url')
const router = express.Router();

/* GET users listing. */
router.put('/', function(req, res, next) {
    const user = new user({
        username: req.body.username,
        password: req.body.password
    })
    console.log(user);
});

module.exports = router;