var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admin.js')
var indexcontroller = require('../controller/index.js')
var getparams = require('../utils/convertparams')
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  var params = {title: '尤文图斯 - FIFA OL3'}

  res.render('index',params);
});

/* GET login page. */
router.get('/adminlogin', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('adminlogin', { title: 'admin login' });
});
router.get('/login', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('login', { title: 'user login' });
});


/* GET logout page. */
router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
  	console.log(req.user)
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});
router.post('/dologin',passport.authenticate('user', {
        failureRedirect: '/login'
    }), function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('userindex',{ title: '用户中心' })
});

router.get('/register', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('register', { title: 'user register' });
});

router.post('/doregister', indexcontroller.doregister);

router.get('/registerfinish', function(req, res) {
  res.render('registerfinish');
});


router.get('/getcaptcha',indexcontroller.getcaptcha);

router.get('/getrecentmatch', indexcontroller.getrecentmatch);

router.get('/getleagueandgroup', indexcontroller.getleagueandgroup);

router.get('/getprepareleague', indexcontroller.getprepareleague);

router.post('/getscoreboard', indexcontroller.getscoreboard);

router.get('/showleagueresult', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('showleagueresult', { leagueid: req.query.leagueid,leaguename: req.query.leaguename });
});

router.post('/getbasicgroup', indexcontroller.getbasicgroup);

router.post('/getagenda', indexcontroller.getagenda);


module.exports = router;
