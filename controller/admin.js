var mysqlclient = require('../utils/mysqlutils.js')
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
      console.log(rows)
      res.send(rows)
    }
  )
}
exports.getgroups = function(req,res){
  var leagueid = req.query.leagueid;
  var queryobj = {}
  queryobj.sql = "select name,league_id,id from grouptable"+
                 " left join player on(grouptable.id league_id = :leagueid)";
  queryobj.params = {"leagueid":leagueid}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          passauth = false;
          return res.send({"status":"error"})
      }
      for(var i=0;i<rows.length;i++){}
      res.send(rows)
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
  queryobj.sql = "select name,qq,id from player";
  queryobj.params = {}
  mysqlclient.query(
    queryobj,function(err,rows){
      if (err || !rows || rows.affectedRows === 0) {
          console.log("mysql err:"+err)
          passauth = false;
          return res.send({"status":"error"})
      }
      console.log(rows)
      res.send(rows)
    }
  )
}
