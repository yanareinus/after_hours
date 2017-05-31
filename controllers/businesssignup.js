var express = require('express');
var router = express.Router();
const models = require('../models');
router.get("/", function(req, res) {
    res.render("businesssignup");
});

router.post("/", function(req, res) {
    models.Business.create({
      name: req.body.nameee,
      phone: req.body.phone,
      website: req.body.website,
      address: req.body.Address,
      hours: req.body.hours,
      description:req.body.description,
      cost:req.body.cost,

    }).then((user) => {
      req.login(user, () =>
        res.redirect('/index')
      );
    }).catch(() => {
      res.render('businesssignup');
    });
})

module.exports = router;
