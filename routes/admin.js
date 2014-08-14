var express = require('express');
var router = express.Router();
var filter = require('./filter')
var getparams = require('../utils/convertparams')
var admincontroller = require('../controller/admin.js')

router.get('/',filter.authorize, function(req, res) {
  //res.render('login', { title: 'login page' });
  params = getparams.generateparams(req);
  res.render('admin',params)
});
router.get('/playerlist',filter.authorize, function(req, res) {
  //res.render('login', { title: 'login page' });
  params = getparams.generateparams(req);
  res.render('playerlist',params)
});

router.post('/createplayer',filter.authorize, admincontroller.createplayer);

router.get('/getplayerlist',filter.authorize, admincontroller.getplayerlist);

router.get('/league',filter.authorize, function(req, res) {
  //res.render('login', { title: 'login page' });
  params = getparams.generateparams(req);
  res.render('league',params)
});

router.get('/addLeaguePage',filter.authorize, function(req, res) {
  //res.render('login', { title: 'login page' });
  params = getparams.generateparams(req);
  res.render('addleague',params)
});

router.post('/createLeague',filter.authorize, admincontroller.createleague);

router.get('/getleaguelist',filter.authorize, admincontroller.getleagues);

router.get('/editleague',filter.authorize, function(req,res){
	params = getparams.generateparams(req);
	params.leagueid = req.query.id;
	params.leaguename = req.query.name;
	res.render('editleague',params)
});
router.get('/getgroups',filter.authorize, admincontroller.getgroups);
router.post('/addgroup',filter.authorize, admincontroller.addgroup);
router.post('/savegroup',filter.authorize, admincontroller.savegroup);

router.get('/editagenda',filter.authorize, function(req,res){
  params = getparams.generateparams(req);
  params.leagueid = req.query.id;
  params.leaguename = req.query.name;
  res.render('editagenda',params)
});
router.post('/generatematchlist',filter.authorize, admincontroller.generatematchlist);



module.exports = router;