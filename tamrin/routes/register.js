const express = require('express');
const user = require('../model/user')
const url = require('url')
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.render('register')
})

router.post('/signUp', function(req, res, next) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ "msg": "bad request :(" })
    }
    const newUser = new user({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
});

module.exports = router;