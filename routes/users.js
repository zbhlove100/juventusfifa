var express = require('express');
var router = express.Router();
var filter = require('./filter')
var getparams = require('../utils/convertparams')


router.use(filter.userRequired);


router.get('/', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('userindex')
});

module.exports = router;