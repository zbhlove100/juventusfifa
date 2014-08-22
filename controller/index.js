var mysqlclient = require('../utils/mysqlutils.js')
var async = require('async')
var objectutils = require('../utils/objectutils.js')
var _ = require("underscore")._;
var moment = require('moment');
var ccap = require('ccap');
var fs = require('fs');
var config = require('../config')
var mkdirp = require('mkdirp');
require('buffer')

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
exports.getprepareleague = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as leagueid,name as leaguename,description from league where status = 'Prepare' \n";
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
exports.getleagueandgroup = function(req,res){
  var queryobj = {}
  queryobj.sql = "select id as leagueid from league where status = 'Active'"
  queryobj.params = {}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      var attr = "(";
      _.each(rows,function(value,index){
        if(index == rows.length -1){
          attr = attr + value.leagueid
        }else{
          attr = attr + value.leagueid + ","
        }
        
      })
      attr = attr +")"
      var queryobj1 = {}
      queryobj1.sql = "select A.id as groupid,A.name as groupname,A.league_id as leagueid,B.name as leaguename \n"+
                      "from grouptable A,league B where A.league_id = B.id and league_id in"+attr;
      queryobj1.params = {}
      
      mysqlclient.query(
        queryobj1,function(err,rows){
          if (err) {
              console.log("mysql err:"+err)
              
              return res.send({"status":"error"})
          }
          console.log(rows)
          res.send(rows)
        }
      )
    }
  )
}

exports.getscoreboard = function(req,res){
  var groupid = req.body.groupid;
  var leaguesize = 1;

  var queryobj1 = {}
  queryobj1.sql = "select B.name as playername,A.score as score,A.totalmatch as totalmatch, \n"+
                  "A.totalwin as totalwin,A.totalequal as totalequal,A.totallose as totallose, \n"+
                  "A.totalgoal as totalgoal,A.totalgetgoal as totalgetgoal,(A.totalgoal-A.totalgetgoal) as totallosegoal \n"+
                  "from groupplayer A,player B \n"+
                  "where A.grouptable_id =:groupid and B.id = A.player_id order by score desc"
  queryobj1.params = {"groupid":groupid}
  
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

exports.getbasicgroup = function(req,res){
  var leagueid = req.body.leagueid;
  var queryobj = {}
  queryobj.sql = "select id as groupid,name as groupname from grouptable where league_id = :leagueid";
  queryobj.params = {"leagueid":leagueid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
          return res.send({"status":"error"})
      }
      console.log("sql getbasicgroup" + rows)
      res.send(rows)
    }
  )
}
exports.getagenda = function(req,res){
  var groupid = req.body.groupid;
  var leagueid = req.body.leagueid;
  var queryobj = {}
  queryobj.sql = "select id as matchid,grouptable_id as groupid,homeplayerid,homeplayername,awayplayerid,awayplayername,homescore,awayscore \n"+
                  "from matchlist where grouptable_id = :groupid";
  queryobj.params = {"groupid":groupid}
  var result = {"members":[],"agenda":[]}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          return res.send({"status":"error"})
      }
      result.agenda = rows;
      var queryobj1 = {}
      queryobj1.sql = "select b.grouptable_id as groupid, a.name as playername,a.id as playerid,a.qq as qq  \n"+
                    "from player a,groupplayer b where a.id = b.player_id and b.grouptable_id = :groupid";
      queryobj1.params = {"groupid":groupid}

      mysqlclient.query(
        queryobj1,function(err1,rows1){
          if (err) {
              console.log("mysql err:"+err1)
              
              return res.send({"status":"error"})
          }
          result.members = rows1;
          res.send(result)
        })

      
    }
  )
}
exports.getcaptcha = function(req,res){

 var captcha = ccap();

  var ary = captcha.get();//ary[0] is captcha's text,ary[1] is captcha picture buffer.

  var text = ary[0];

  var buffer = ary[1];

  var now = moment();
  var staticpath ="/images/captcha/"
  var dirname = config.captchapath +now.format('YYYYMMDD')
  var returnname = staticpath + now.format('YYYYMMDD') +"/"+ now.format('YYYYMMDDmmss') +".jpg";
  var filename = dirname +"/" + now.format('YYYYMMDDmmss') +".jpg";
  mkdirp(dirname, function (err) {
      if (err){
        console.error(err)
        throw err;
      } 
      console.log('create dir:'+dirname)
      fs.writeFile(filename, buffer, 'binary', function (err) {
              if (err){
                console.log('error');
                throw err;
              } 
              console.log('file saved');
              var result = {}
              result.text = text;
              result.pic = returnname;
              res.send(result);
          });
  });
  
}

exports.doregister = function(req,res,next){
  var name = req.body.username;
  var password = req.body.password;
  var qq = req.body.qq;
  var email = req.body.email; 
  if(password.length < 6){
    res.render("register",{"error":"密码最少6位"})
  }else{
    password = new Buffer(password).toString('base64');
  }
  var queryobj = {}
  queryobj.sql = "insert user(name,password,role,qq,email,status) values (:name,:password,'user',:qq,:email,:status)";
  queryobj.params = {"name":name,"password":password,"qq":qq,"email":email,"status":"Active"}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          res.render("register",{"error":"发生错误"})
      }
      res.redirect("/registerfinish")
    }
  )
}