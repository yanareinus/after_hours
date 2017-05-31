
var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    res.render('index', {
        custom_css: '/css/index/index.css',
    });
});

module.exports = router;



var response=require('express');
console.log(response);