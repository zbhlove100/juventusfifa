var express = require('express');
var debug = require('debug')('juventusapp');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*var session = require('cookie-session')*/
var session = require('express-session')
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;



var expressValidator = require('express-validator')
var app = express();

var mysqlclient = require('./utils/mysqlutils.js')

require('./utils/auth.js')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'UYG899',cookie: { maxAge: 6000000,secure: false }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());


var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin')

app.use('/',routes);
app.use('/users', users);

app.use('/admin',admin);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
//module.exports = app;
