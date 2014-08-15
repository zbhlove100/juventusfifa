var mysqlclient = require('../utils/mysqlutils.js')
var async = require('async')
var objectutils = require('../utils/objectutils.js')
var _ = require("underscore")._;
var moment = require('moment');

function sessionandrend(req,res,params,passauth){
  if(passauth){
    req.session.user_id = params.username;
    req.session.user_name = params.username;
    res.redirect("/admin")
  }else{
    var params={title:'Login error',error:"用户名或密码错误!"};
      res.render('login', params);
  }
}
function checkuser(req,res,params,callback){
  var queryobj = {}
  queryobj.sql = "select count(*) as num from user where name = :username and password = :password";
  queryobj.params = {"username":params.username,"password":params.password}

  var passauth = false;
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          passauth = false;
          return callback(req,res,params,passauth)
      }
      if(rows[0].num !=0)
        passauth = true;

      callback(req,res,params,passauth)
    }
  )
}
exports.dologin = function(req, res,next){
    // 校验
    req.assert('username', "用户名不能为空").notEmpty();
    req.assert('password', "密码不能为空").notEmpty();
    var errors = req.validationErrors();
    if(errors && errors.length>0)
    {
      var ermsg = [];
      for(var i=0;i<errors.length;i++)
      {
        ermsg.push(errors[i].msg);
      }
      var params={title:'管理后台-- 请先登录',error:ermsg.join("\t")};
      res.render('login', params);
      return;
    }
    var authparams = {}
    authparams.username = req.body.username;
    authparams.password = req.body.password;

    checkuser(req,res,authparams,sessionandrend)
 
}
exports.dologout = function(req,res,next){
  req.session = null;
  res.redirect('/');
}
exports.createleague = function(req,res){
  var mode = "double"
  var queryobj = {}
  queryobj.sql = "insert league(name,mode,status) values (:leaguename,:mode,:status)";
  queryobj.params = {"leaguename":req.body.leaguename,"mode":mode,"status":"Active"}
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
exports.getleagues = function(req,res){
  var queryobj = {}
  queryobj.sql = "select name,mode,id,status from league where status = :status";
  queryobj.params = {"status":"Active"}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      
      res.send(rows)
    }
  )
}
exports.getgroups = function(req,res){
  var leagueid = req.query.leagueid;
  
  var queryobj = {}
  queryobj.sql = "select x.groupname as groupname,y.playerid as playerid,y.playername as playername,y.qq as playerqq \n" +
                  "from \n"+ 
                  "(select g.name as groupname,g.id as groupid from grouptable  g where g.league_id = :leagueid) x \n"+
                  "left join  \n"+
                  "(select a.name as playername,a.id as playerid,a.qq as qq,b.grouptable_id as groupid  \n"+
                    "from player a,groupplayer b where a.id = b.player_id) y \n"+
                  "on (x.groupid = y.groupid)";
  /*queryobj.sql = "select g.name as groupname,g.id as groupid from grouptable  g where g.league_id = :leagueid"*/
  queryobj.params = {"leagueid":leagueid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      
      res.send(rows)
    }
  )
}

exports.addgroup = function(req,res){
  var queryobj = {}
  queryobj.sql = "insert grouptable(name,league_id) values (:groupname,:leagueid)";
  queryobj.params = {"groupname":req.body.groupname,"leagueid":req.body.leagueid}
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

exports.savegroup = function(req,res){
  var groupdata = req.body.groupdata;
  var queryobj = {}
  queryobj.sql = "select id,name from grouptable where league_id = :leagueid and name = :groupname";
  queryobj.params = {"groupname":groupdata.name,"leagueid":req.body.leagueid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          
          return res.send({"status":"error"})
      }
      var groupid = rows[0].id;
      console.log("groupid:"+groupid)
      var queryobj1 = {}
      queryobj1.sql = "delete from groupplayer where grouptable_id = :groupid";
      queryobj1.params = {"groupid":groupid}
      mysqlclient.query(queryobj1,function(err,rows){
        if (err) {
            console.log("mysql err:"+err)
            
            return res.send({"status":"error"})
        }
        console.log("affectedRows:"+rows.affectedRows)
        
        var attr = []
        for(var i=0;i<groupdata.members.length;i++){
          var t = groupdata.members[i]
          //var n = {"groupid":groupid,"playerid":parseInt(t.playerid)}
          var n=[groupid,parseInt(t.playerid)]
          attr.push(n);
        }
        var pool = mysqlclient.getpool();
        var queryobj2 = {}
        pool.getConnection(function (err, connection) {

          if (err) {
              throw err;
          }
          queryobj2.sql = "insert groupplayer(grouptable_id,player_id) values" + connection.escape(attr);
          connection.query(queryobj2.sql, function(err, results) {
            if (err) {
              console.log("mysql err:"+err)
              return res.send({"status":"error"})
            }
            return res.send({"status":"success"})
          })
        })
      })
      
    }
  )
}

exports.createplayer = function(req,res){
  var queryobj = {}
  queryobj.sql = "insert player(name,qq) values (:playername,:playerqq)";
  queryobj.params = {"playername":req.body.playername,"playerqq":req.body.playerqq}
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
exports.getplayerlist = function(req,res){
  var queryobj = {}
  queryobj.sql = "select name as playername,qq as playerqq,id as playerid from player";
  queryobj.params = {}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
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
exports.editmatchelement = function(req,res){

  var matchid = req.body.matchid;
  var now = moment();
  var homes = 0;
  var aways = 0;
  var homegoal = parseInt(req.body.homescore) - parseInt(req.body.awayscore);
  var awaygoal = parseInt(req.body.awayscore) - parseInt(req.body.homescore);
  if(req.body.homescore>req.body.awayscore){
    homes =3;
  }
  if(req.body.homescore==req.body.awayscore){
      homes =1;
      aways = 1;
  }
  if(req.body.homescore<req.body.awayscore){
      aways = 3;
  }
  var queryobj = {}
  queryobj.sql = "UPDATE matchlist SET homescore=:homescore, awayscore=:awayscore, \n"+
                  "homegetscore =:homegetscore,awaygetscore=:awaygetscore, \n"+
                  "homegetgoal=:homegetgoal,awaygetgoal=:awaygetgoal,updatetime=:updatetime WHERE id=:matchid";
  queryobj.params = {"matchid":matchid,
                    "homescore":req.body.homescore,
                    "awayscore":req.body.awayscore,
                    "homegetscore":homes,
                    "awaygetscore":aways,
                    "homegetgoal":homegoal,
                    "awaygetgoal":awaygoal,
                    "updatetime":now.format('YYYY-MM-DD HH:mm:ss')}
  
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err) {
          console.log("mysql err:"+err)
          passauth = false;
          return res.send({"status":"error"})
      }
      var queryobj1 = {}
      queryobj1.sql = "select grouptable_id as groupid,homeplayerid,awayplayerid from matchlist where id = :matchid";
      queryobj1.params = {"matchid":matchid}
      mysqlclient.query(
        queryobj1,function(err,rows){
          if (err) {
              console.log("mysql err:"+err)
              passauth = false;
              return res.send({"status":"error"})
          }
          var homeplayerid = rows[0].homeplayerid;
          var awayplayerid = rows[0].awayplayerid;
          var groupid = rows[0].groupid;
          var queryobj2 = {}
          queryobj2.sql = "update groupplayer set score =( \n"+
                          "select sum(A.score) as score from ( \n"+
                          "select sum(homegetscore) as score  from matchlist where homeplayerid = :playerid1  union all \n"+
                          "select sum(awaygetscore) as score  from matchlist where awayplayerid = :playerid2 \n"+
                          ") as A \n"+
                          ") where grouptable_id = :groupid and player_id = :playerid3";
          console.log(queryobj2.sql)
          queryobj2.params = {"playerid1":homeplayerid,"playerid2":homeplayerid,"playerid3":homeplayerid,"groupid":groupid}
          mysqlclient.query(
            queryobj2,function(err,rows){
              if (err) {
                  console.log("mysql err:"+err)
                  passauth = false;
                  return res.send({"status":"error"})
              }
              queryobj2.params = {"playerid1":awayplayerid,"playerid2":awayplayerid,"playerid3":awayplayerid,"groupid":groupid}
              mysqlclient.query(
                queryobj2,function(err,rows){
                  if (err) {
                      console.log("mysql err:"+err)
                      passauth = false;
                      return res.send({"status":"error"})
                  }
                  res.send({"status":"success"})
                  
                }
              )
            }
          )
     }
    )
   
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
exports.generateagenda = function(req,res){
  var groupid = req.body.groupid;
  var leagueid = req.body.leagueid;
  var queryobj = {}
  queryobj.sql = "delete from matchlist where grouptable_id = :groupid";
  /*queryobj.sql = "select g.name as groupname,g.id as groupid from grouptable  g where g.league_id = :leagueid"*/
  queryobj.params = {"groupid":groupid}
  mysqlclient.query(
    queryobj,function(err,rows){
     if (err) {
            console.log("mysql err:"+err)
            return res.send({"status":"error"})
        }

    var queryobj1 = {}
    queryobj1.sql = "select b.grouptable_id as groupid, a.name as playername,a.id as playerid,a.qq as qq  \n"+
                      "from player a,groupplayer b where a.id = b.player_id and b.grouptable_id = :groupid";
    /*queryobj.sql = "select g.name as groupname,g.id as groupid from grouptable  g where g.league_id = :leagueid"*/
    queryobj1.params = {"groupid":groupid}
    mysqlclient.query(
      queryobj1,function(err,rows){
        if (err || !rows || rows.affectedRows === 0) {
            console.log("mysql err:"+err)
            return res.send({"status":"error"})
        }
        var object1 = rows;
        var object2 = objectutils.cloneJson(object1);
        var attr = []

        _.each(object1,function(obj,index){
          _.each(object2,function(obj2,index2){
            if(obj.playerid != obj2.playerid){
              var n = [leagueid,groupid,obj.playerid,obj.playername,obj2.playerid,obj2.playername]
              attr.push(n);
            }
          })
          
        })


        
        
        var pool = mysqlclient.getpool();
        var queryobj2 = {}
        pool.getConnection(function (err, connection) {

          if (err) {
              throw err;
          }
          queryobj2.sql = "insert matchlist (league_id,grouptable_id,homeplayerid,homeplayername,awayplayerid,awayplayername) values" + connection.escape(attr);
          connection.query(queryobj2.sql, function(err, results) {
            if (err) {
              console.log("mysql err:"+err)
              return res.send({"status":"error"})
            }
            return res.send({"status":"success"})
          })
        })
        //res.send(rows)
      }
    )
  })

}