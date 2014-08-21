exports.authorize = function(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    console.log("****"+req.session.user_name)
    next();
  }
}
exports.adminRequired = function (req, res, next) {
    console.log(req.session)
   var url = req.originalUrl;
   var isadmin = req.session.passport.user == undefined?false:req.session.passport.user.isadmin;
    if (url != "/admin/dologin"&&!isadmin) {
      return res.redirect("/adminlogin");
    }
    next();
};

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  if (!req.user) {
    return res.send(403, 'forbidden!');
  }
  next();
};

/**
 * 需要登录，响应错误页面
 */
exports.signinRequired = function (req, res, next) {
  if (!req.session.user) {
    res.render('notify/notify', {error: '未登入用户不能发布话题。'});
    return;
  }
  next();
};

exports.blockUser = function () {
  return function (req, res, next) {
    if (req.session.user && req.session.user.is_block) {
      return res.send('您被屏蔽了。');
    }
    next();
  };
}