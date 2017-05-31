const express = require('express');
const models = require('../models');
const util = require('util');
var router = express.Router();

router.get("/", function(req, res) {
    res.render("signup", {
        custom_css: '/css/index/index.css',
    });
});

router.post("/", function(req, res) {
    req.assert('firstname', 'Empty or invalid').notEmpty();
    req.assert('lastname', 'Empty or invalid').notEmpty();
    req.assert('username', 'Empty or invalid').notEmpty();
    req.assert('email', 'Valid email required').isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    req.assert('password2', '6 to 20 characters required').len(6, 20);
    var errors = req.validationErrors();

    if (req.body.password !== req.body.password2) {
        if (errors === false) {
            errors = [];
        }
        errors.push({param: 'pass_not_match', msg: 'Two passwords not match'});
    }

    var context = {};
    context["custom_css"] = '/css/index/index.css';
    if (errors) {
        errors.forEach(function(obj) {
            context[obj["param"]+"_error"] = obj["msg"];
        });
        res.render('signup', context);
        return;
    }

    models.User.create({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      gender: req.body.gender,
      username: req.body.username,
    }).then((user) => {
        console.log(user.username);
      req.login(user, function(err) {
          if (err) { return next(err); }
          return res.redirect("/userprofile");
        }
      );
    }).catch(() => {
        console.log("failed to log in");
      res.render('signup', context);
    });
})


module.exports = router;
