const express = require('express');
const users = require('../model/user');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const bcrypt = require('bcrypt');

router.get('/', generalTools.loginChecker, (req, res) => {
    const user = req.session.user
    res.render('dashboard', { user })
});

router.get('/logout', (req, res) => {
    console.log(req.cookies.user_sid);
    res.clearCookie("user_sid");
    res.redirect('/api/dashboard')

})

router.post('/edit', generalTools.loginChecker, (req, res) => {
    console.log(req.body);
    users.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, user) => {
        if (err) return res.status(500).send({ "msg": "server error :(" })
        res.clearCookie("user_sid");
        if (user) return res.send({ "msg": "sucsses" });
    })
})

router.post('/password', generalTools.loginChecker, (req, res) => {
    users.findOne({ _id: req.body._id }, function(err, user) {
        if (err) return res.status(500).send({ "msg": "server error " })
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, respoonse) {
                if (err) return res.status(500).send({ "msg": "server error " })
                if (respoonse) {
                    users.findOneAndUpdate({ _id: req.body._id }, { password: req.body.new_password }, { new: true }, function(err, user) {
                        if (err) return res.status(500).send({ "msg": "server error " })
                        res.clearCookie("user_sid");
                        if (user) res.send({ "msg": "sucsses" })
                    });
                } else {

                    return res.send({ "msg": 'wrong password' });
                }
            });
        }
    })
})

module.exports = router;