const express = require('express');
const passport = require('../middlewares/authentication');
const router = express.Router();
const app = express();

router.get("/", function(req, res) {
    res.render("login", {
        custom_css: '/css/index/index.css',
    });
});

router.post("/", passport.authenticate('local', {
    successRedirect: '/search',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
