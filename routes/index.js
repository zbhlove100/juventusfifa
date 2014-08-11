var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admin.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('login', { title: 'Login page' });
});

router.post('/dologin', admincontroller.dologin);

/* GET logout page. */
router.get('/logout', function(req, res) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
