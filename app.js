const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./db');

const indexRouter = require('./routes/index');

 
const app = express();

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connecting to database
// mongoose.connect('mongodb+srv://skshivkumar888:x7s2t9apVnciAJLd@cluster0.s0tu3gn.mongodb.net',)
// .then(res=> console.log('db connected')).catch(err=> console.log('error db connection',err));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) { 
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;

