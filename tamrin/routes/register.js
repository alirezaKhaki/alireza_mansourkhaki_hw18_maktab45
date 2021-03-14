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
        return res.status(400).send({ "msg": "bad Request" })
    }
    users.findOne({ username: req.body.username }, function(err, User) {
        if (err) return res.status(500).send({ "msg": "internal server error" })
        if (User) {
            res.status(409).send({ "msg": "user already exist!" })
        } else {
            console.log(req.body)
            const newUser = new users({
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email
            })
            newUser.save((err, user) => {
                if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
                console.log(user);
                if (user) return res.json({ "msg": "success" })
            })
        }
    })


});

module.exports = router;