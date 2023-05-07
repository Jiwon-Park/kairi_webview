var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression');
const asyncify = require('express-asyncify')
const helmet = require('helmet')
const {STATUS_CODES} = require('http')

var indexRouter = require('./routes/index');
var filesRouter = require('./routes/files');
const vendorRouter = require('./routes/vendors')

var app = asyncify(express());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');

app.use(helmet({
  referrerPolicy: {policy: "no-referrer"},
  frameguard: false,
  xssFilter: false,
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: "cross-origin",
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(function (req, res, next) {
  if (req.url.endsWith("webp") || req.url.endsWith("json") || req.url.endsWith("png") || req.url.endsWith("moc") || req.url.endsWith("mtn")) {
    res.set('cache-control', 'max-age=31536000');
  }
  else if (req.url.endsWith("js") || req.url.endsWith("css")) {
    res.set('cache-control', 'max-age=300');
  }
  else {
    res.set('cache-control', 'no-cache');
  }
  next()
});

app.use('/', indexRouter);
app.use('/cardimg', filesRouter);
app.use('/vendor', vendorRouter);

app.use(express.static(path.join(__dirname, 'resources/static')));
app.use('/thumbnails', express.static(path.join(__dirname, 'resources/thumbnails')))
app.use('/live2d_resource', express.static(path.join(__dirname, 'resources/live2d_resource')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'resources/favicon.ico')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const errcode = err.status || 500
  // render the error page
  res.status(err.status || 500);
  res.locals.message = req.app.get('env') === 'development' ? err.message : ' ' + errcode + ' ' + STATUS_CODES[errcode];
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

module.exports = app;
