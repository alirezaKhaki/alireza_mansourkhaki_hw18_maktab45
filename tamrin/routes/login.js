const express = require('express');
const users = require('../model/user')
const url = require('url')
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    users.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send({ "msg": "server error " })
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, respoonse) {
                if (err) return res.status(500).send({ "msg": "server error " })
                if (respoonse) {
                    res.send({ "msg": "login sucssesfull" })
                } else {

                    return res.send({ "msg": 'incorrect username or password' });
                }
            });
        } else if (!user) {
            res.send({ "msg": 'incorrect username or password' });
        }
    })
})


module.exports = router;