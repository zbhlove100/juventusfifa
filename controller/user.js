var mysqlclient = require('../utils/mysqlutils.js')
var async = require('async')
var objectutils = require('../utils/objectutils.js')
var _ = require("underscore")._;
var moment = require('moment');

exports.getusermessage = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as userid,qq as userqq,email as useremail,name as username from user where id = :userid and status = 'Active'";
  queryobj.params = {"userid":req.body.userid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
      }
      res.send(rows)
    }
  )
}
exports.getplayermessage = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as playerid,name as playername,location from player where user_id = :userid ";
  queryobj.params = {"userid":req.body.userid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
      }
      res.send(rows)
    }
  )
}
exports.signupleague = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as leagueid,name as leaguename,description from league where id = :leagueid ";
  queryobj.params = {"leagueid":req.query.leagueid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
      }
      var league = rows[0];
      queryobj.sql = "select id as playerid,name as playername,location from player where user_id = :userid ";
      queryobj.params = {"userid":req.user.userid}
      mysqlclient.query(
        queryobj,function(err,rows){
          if (err) {
              console.log("mysql err:"+err)
              passauth = false;
          }
          queryobj.sql = "select id from signuptable where league_id = :leagueid and user_id = :userid ";
          queryobj.params = {"userid":req.user.userid,"leagueid":req.query.leagueid}
          mysqlclient.query(
            queryobj,function(err,rows1){
              if (err) {
                  console.log("mysql err:"+err)
                  passauth = false;
              }
              result={}
              result.league = league;
              result.player = rows;
              result.issignup = rows1.length==0?false:true;
              res.render("signupleague",result)
            }
          )
        }
      )
    }
  )
}

exports.dosignup = function(req,res){
  var queryobj = {}
  queryobj.sql = "insert signuptable(league_id,player_id,user_id) values (:leagueid,:playerid,:userid)";
  queryobj.params = {"leagueid":req.query.leagueid,"playerid":req.query.playerid,"userid":req.user.userid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      res.redirect('/users/signupleague?leagueid='+req.query.leagueid)
    }
  )
}
exports.createplayer = function(req,res){
  var queryobj = {}
  queryobj.sql = "insert player(name,location,user_id) values (:playername,:location,:userid)";
  queryobj.params = {"playername":req.body.playername,"location":req.body.location,"userid":req.body.userid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      res.send({"status":"Success"})
    }
  )
}