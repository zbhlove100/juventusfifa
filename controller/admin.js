var mysqlclient = require('../utils/mysqlutils.js')
var async = require('async')
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
          passauth = false;
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
          passauth = false;
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
          passauth = false;
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
          passauth = false;
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
          passauth = false;
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
            passauth = false;
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
          passauth = false;
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
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          passauth = false;
          return res.send({"status":"error"})
      }
      res.send(rows)
    }
  )
}
exports.generatematchlist = function(req,res){
  var groupid = req.body.groupid;
  var leagueid = req.body.leagueid;
  var queryobj = {}
  queryobj.sql = "select a.name as playername,a.id as playerid,a.qq as qq,b.grouptable_id as groupid  \n"+
                    "from player a,groupplayer b where a.id = b.player_id and b.grouptable_id = :groupid";
  /*queryobj.sql = "select g.name as groupname,g.id as groupid from grouptable  g where g.league_id = :leagueid"*/
  queryobj.params = {"leagueid":leagueid}



}