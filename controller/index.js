var mysqlclient = require('../utils/mysqlutils.js')
var async = require('async')
var objectutils = require('../utils/objectutils.js')
var _ = require("underscore")._;
var moment = require('moment');

exports.getrecentmatch = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as matchid,grouptable_id as groupid,homeplayerid,homeplayername,awayplayerid,awayplayername,homescore,awayscore \n"+
                  "from matchlist order by updatetime desc limit 4";
  queryobj.params = {}
  
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      
      res.send(rows)
    }
  )
}

exports.getscoreboard = function(req,res){
  var leagueid = req.body.leagueid;
  var leaguesize = 1;
  if(leagueid == 0){

  }
  var queryobj = {}
  queryobj.sql = "select select id as leagueid from league where status = 'Active' order by id desc ";
  queryobj.params = {}
  
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }

      var queryobj1 = {}
      queryobj1.sql = "select A.score as score,B.name as playername,C.name as groupname from groupplayer A,player B,grouptable C \n"+
                      "where (A.grouptable_id = C.id and A.player_id = B.id and C.league_id = :leagueid) order by groupname,score desc";
      queryobj1.params = {"leagueid":rows[0].leagueid}
      
      mysqlclient.query(
        queryobj1,function(err,rows){
          if (err) {
              console.log("mysql err:"+err)
              
              return res.send({"status":"error"})
          }
          
          
          res.send(rows)
        }
      )
    }
  )
}