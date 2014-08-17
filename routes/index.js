var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admin.js')
var indexcontroller = require('../controller/index.js')
var getparams = require('../utils/convertparams')

/* GET home page. */
router.get('/', function(req, res) {
  var params = {title: 'Express'}
  if(req.session.user_id){
  	params = getparams.generateparams(req);
  }
  res.render('index', params);
});

/* GET login page. */
router.get('/login', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('login', { title: 'Login page' });
});

router.post('/dologin', admincontroller.dologin);

/* GET logout page. */
router.get('/logout', admincontroller.dologout);

router.get('/getrecentmatch', indexcontroller.getrecentmatch);

router.post('/getscoreboard', indexcontroller.getscoreboard);

module.exports = router;
