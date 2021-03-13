const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');

router.get('/', generalTools.loginChecker, (req, res) => {
    const user = req.session.user
    res.render('dashboard', { user })
});

router.get('/logout', (req, res) => {
    console.log(req.cookies.user_sid);
    res.clearCookie("user_sid");
    res.redirect('/api/dashboard')

})

module.exports = router;