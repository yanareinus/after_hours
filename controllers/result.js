var express = require('express');
var router = express.Router();
const models = require('../models');

router.post('/',function(req,res){
models.User.findAll({
	attributes:['first_name','last_name','username','email'],
	where:{username:req.body.username},})
.then((post) =>
      (post ? res.render('search/result',{ user: req.user,custom_css: '/css/index/index.css', post }) : res.redirect('/search'))
    );
});

module.exports = router;

