const express = require('express');
const users = require('../model/user')
const url = require('url')
const router = express.Router();
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');

router.get('/', generalTools.sessionChecker, (req, res) => {
    res.render('register')
})

router.post('/', function(req, res, next) {

    if (!req.body.username || !req.body.password) {
        return res.status(400).send("username or password is empty")
    }
    if (req.body.username.length < 3 || req.body.username.length > 20) {
        return res.status(400).send("username length must be in this range =>(3-20)")
    }
    if (req.body.password.length < 3) {
        return res.status(400).send("password length must be greater than 3")
    }
    // if (!email.match(mailformat)) {
    //     console.log(false);
    // }
    users.findOne({ username: req.body.username }, function(err, User) {
        if (err) return res.status(500).send({ "msg": "internal server error" })
        if (User) {
            res.status(409).send("user already exist!")
        } else {
            console.log(req.body)
            const newUser = new users({
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email
            })
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    if (err.stack.includes("Email address is required")) {
                        return res.status(400).send("Email address is required");
                        return res.status(500).send();
                    } else if (err.stack.includes("Please fill a valid email address")) {
                        return res.status(400).send("Please fill a valid email address");
                        return res.status(500).send();
                    }
                }
                if (user) return res.json({ "msg": "success" })
            })
        }
    })


});

module.exports = router;