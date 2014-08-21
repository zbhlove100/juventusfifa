var mysqlclient = require('../utils/mysqlutils.js')
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

  passport.use('admin', new LocalStrategy(
    function (username, password, done) {      
        var queryobj = {}
        queryobj.sql = "select id as userid,role,name as username from user where name = :username and password = :password and (role = :role or role = :role2)";
        queryobj.params = {"username":username,"password":password,"role":"admin","role2":"root"}
        console.log(queryobj.sql)
        var passauth = false;
        mysqlclient.query(
          queryobj,function(err,rows){
            if (err || !rows || rows.affectedRows === 0) {
                console.log("mysql err:"+err)
                passauth = false;
            }
            if(rows.length !=0)
              passauth = true;

            if(passauth){
                user = {}
                user.userid = rows[0].userid;
                user.role = rows[0].role
                user.username = rows[0].username;
                user.isadmin = true;
              return done(null, user);
            }else{
              return done(null, false, { message: '用户名或密码错误!' });
            }
          }
        )
    }
  ));
  passport.use('user', new LocalStrategy(
    function (username, password, done) {      
        var queryobj = {}
        queryobj.sql = "select id as userid,role,name as username from user where name = :username and password = :password and role = :role and status = 'Active'";
        queryobj.params = {"username":username,"password":password,"role":"user"}
        console.log(queryobj.sql)
        var passauth = false;
        mysqlclient.query(
          queryobj,function(err,rows){
            if (err || !rows || rows.affectedRows === 0) {
                console.log("mysql err:"+err)
                passauth = false;
            }
            if(rows.length !=0)
              passauth = true;

            if(passauth){
                user = {}
                user.userid = rows[0].userid;
                user.role = rows[0].role
                user.username = rows[0].username;
                console.log(user)
              return done(null, user);
            }else{
              return done(null, false, { error: '用户名或密码错误!' });
            }
          }
        )
    }
  ));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
}