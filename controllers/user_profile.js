var express = require('express');
var router = express.Router();
const models = require('../models');

router.get("/", function(req, res) {

    if (req.user == null) {
        res.redirect('/login');
    } else {
      res.render("userprofile",{ user: req.user,custom_css: '/css/index/index.css', });
    }
});

router.post('/:username',function(req, res) {
models.User.update({
  first_name:req.body.firstname,
  last_name:req.body.lastname,
  gender: req.body.gender,
  username:req.body.username,
  email:req.body.email,
  phone:req.body.phone,
  about_me:req.body.about_me,
  },
  {
    where:{
username:req.params.username,
  },
}).then((get) => {
res.redirect("/userprofile");})
}
);

module.exports = router;