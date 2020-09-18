var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var flash = require('connect-flash'); 
var config = require('config-lite')(__dirname); 
var data = require('./config/role');
var easySession = require('easy-session');

var indexRouter = require('./routes/index');
var sitesRouter = require('./routes/sites');
var adminRouter = require('./routes/superuser');

var basilwizi = express();

// view engine setup
basilwizi.set('views', path.join(__dirname, 'views'));
basilwizi.set('view engine', 'pug');

basilwizi.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: config.session.maxAge
  },
  url: config.session.url
}));
/** Session will expire after 40 minutes of inactivity */
basilwizi.use(easySession.main(session, {rbac: data.roles, ipCheck: true, uaCheck: true, maxFreshTimeout: 2400000 }));

basilwizi.use(flash());

basilwizi.use(logger('prod'));
basilwizi.use(express.json());
basilwizi.use(express.urlencoded({ extended: false }));
basilwizi.use(cookieParser());
basilwizi.use(express.static(path.join(__dirname, 'public')));

basilwizi.use(require('connect-flash')());

basilwizi.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/images/profiles'),
  keepExtensions: true
}));

basilwizi.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

basilwizi.use('/', indexRouter);
basilwizi.use('/sites', sitesRouter); 
basilwizi.use('/superuser', adminRouter);

// catch 404 and forward to error handler
basilwizi.use(function(req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.basilwizi.get('env') === 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// error page render
basilwizi.use(function (err, req, res, next) {
  res.render('error', {
      error: err
  });
});

module.exports = basilwizi;