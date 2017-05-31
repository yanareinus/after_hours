var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('business-profile Controller :: Time: ', Date.now());
    next();
});

router.get("/", function(req, res) {
    res.send("business-Profile");
});

module.exports = router;