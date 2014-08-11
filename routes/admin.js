
/*var admincontroller = require("../controller/admin")

exports.login = function(req, res, next) {
  if (!req.session.user_id) {
    res.render('/admin/login');
  } else {
    next();
  }
}
exports.logout = function(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/admin/login');
  } else {
    next();
  }
}*/
var express = require('express');
var router = express.Router();
var filter = require('./filter')

router.get('/',filter.authorize, function(req, res) {
  //res.render('login', { title: 'login page' });
  res.send('respond with a resource');
});

module.exports = router;