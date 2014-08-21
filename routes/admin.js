var express = require('express');
var router = express.Router();
var filter = require('./filter')
var getparams = require('../utils/convertparams')
var admincontroller = require('../controller/admin.js')
var passport = require('passport');

router.use(filter.adminRequired);
router.get('/', function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('playerlist')
});

router.post('/dologin',passport.authenticate('admin', {
        failureRedirect: '/adminlogin'
    }), function(req, res) {
  //res.render('login', { title: 'login page' });
  res.render('playerlist')
});

router.get('/playerlist', function(req, res) {
  //res.render('login', { title: 'login page' });
  var params ={}
  res.render('playerlist',params)
});
/*router.post('/dologin', admincontroller.dologin);*/

router.post('/createplayer', admincontroller.createplayer);

router.get('/getplayerlist', admincontroller.getplayerlist);

router.get('/league', function(req, res) {
  //res.render('login', { title: 'login page' });
  var params ={}
  res.render('league',params)
});

router.get('/addLeaguePage', function(req, res) {
  //res.render('login', { title: 'login page' });
  var params ={}
  res.render('addleague',params)
});

router.post('/createLeague', admincontroller.createleague);

router.get('/getleaguelist', admincontroller.getleagues);

router.get('/editleague', function(req,res){
	var params ={}
	params.leagueid = req.query.id;
	params.leaguename = req.query.name;
	res.render('editleague',params)
});
router.get('/getgroups', admincontroller.getgroups);
router.post('/getbasicgroup', admincontroller.getbasicgroup);
router.post('/addgroup', admincontroller.addgroup);
router.post('/savegroup', admincontroller.savegroup);

router.get('/editagenda', function(req,res){
  var params ={}
  params.leagueid = req.query.id;
  params.leaguename = req.query.name;
  res.render('editagenda',params)
});
router.post('/generateagenda', admincontroller.generateagenda);

router.post('/getagenda', admincontroller.getagenda);
router.post('/editmatchelement', admincontroller.editmatchelement);


module.exports = router;