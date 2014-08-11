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
      var json={title:'管理后台-- 请先登录',error:ermsg.join("\n")};
      res.render('/login', json);
      return;
    }
    var userid = req.body.username;
    var pwd = req.body.password;
    var ip = req.ip;
    if(userid == "root"&&pwd == "password"){
      res.render('index', { title: 'Express' });
    }
 
};