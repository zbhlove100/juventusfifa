var express = require('express');
var router = express.Router();
var filter = require('./filter')
var getparams = require('../utils/convertparams')
var usercontroller = require('../controller/user')

router.use(filter.userRequired);


router.get('/', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('userindex')
});

router.post('/getusermessage', usercontroller.getusermessage);

router.post('/getplayermessage', usercontroller.getplayermessage);

router.post('/createplayer', usercontroller.createplayer);


module.exports = router;