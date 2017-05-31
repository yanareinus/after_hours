var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {

if (req.user == null) {
        res.redirect('/login');
         } else {

        res.render("search",{ user: req.user, success: req.flash('success'),custom_css: '/css/index/index.css', });
}
});

module.exports = router;

