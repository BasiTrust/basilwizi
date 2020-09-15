var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var flash = require('connect-flash'); 
var config = require('config-lite')(__dirname); 
var pkg = require('./package');
var data = require('./config/role');
const { dbUrl } = require('./_few_only/store.json');
var easySession = require('easy-session');

var indexRouter = require('./routes/index');
var sitesRouter = require('./routes/sites');

var app = express();
var Server = require('http').createServer(app);
var io = require('socket.io')(Server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: config.session.maxAge
  },
  url: dbUrl
}));
/** Session will expire after 40 minutes of inactivity */
app.use(easySession.main(session, {rbac: data.roles, ipCheck: true, uaCheck: true, maxFreshTimeout: 2400000 }));

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-flash')());

app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/images/profiles'),
  keepExtensions: true
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

app.use('/', indexRouter);
app.use('/sites', sitesRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// error page render
app.use(function (err, req, res, next) {
  res.render('error', {
      error: err
  });
});

io.on('connection', function(socket){
  socket.on('comment', function(data){
    var commentData = new Comments(data);
    commentData.save();
    socket.broadcast.emit('comment', data);
  });
  socket.on('reply', function(data){
    var replyData = new Replys(data);
    replyData.save();
    socket.broadcast.emit('reply', data);
  });
});
/*
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});*/

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 7120;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;