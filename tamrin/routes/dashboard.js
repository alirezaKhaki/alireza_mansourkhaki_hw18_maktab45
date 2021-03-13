const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');

router.get('/', generalTools.loginChecker, (req, res) => {

});


module.exports = router;