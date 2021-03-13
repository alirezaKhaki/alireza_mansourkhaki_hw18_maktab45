const express = require('express');
const users = require('../model/user')
const url = require('url')
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
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
                password: req.body.password
            })
            console.log(newUser)
            newUser.save((err, user) => {
                if (err) return res.status(500).json({ msg: "Server Error :)", err: err.message });
                if (user) return res.json({ "msg": "success" })
            })
        }
    })


});

module.exports = router;