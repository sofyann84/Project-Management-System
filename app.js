var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 

// require password
var bcrypt = require('bcrypt');

//library Express Session
var session = require('express-session')

//Kongfigurasi Connect-Flash
var flash = require('connect-flash');

const fileUpload = require('express-fileupload');

//Integration Postgree Data Base
const { Pool } = require('pg')

// const pool = new Pool({
//   user: 'sofyan',
//   host: 'localhost',
//   database: 'pmsdb',
//   password: '12345',
//   port: 5432,
// })

const pool = new Pool({
  user: 'bzwxtgovtzwijp',
  host: 'ec2-50-16-198-4.compute-1.amazonaws.com',
  database: 'ddpg3pjed72l1s',
  password: '1ba03a33006f68f71918b700dcd5a6c5af9e4a61496ed45fb32e203e85d084ae',
  port: 5432,
})


var indexRouter = require('./routes/index') (pool);
var usersRouter = require('./routes/users') (pool);
var projectRouter = require('./routes/projects') (pool);
var profileRouter = require('./routes/profile') (pool);


var app = express();


//Membuat Crypt Password
bcrypt.hash('12345', 10, function(err, hash) {
//  console.log(hash);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tim21',
}))
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/profile', profileRouter);


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
  res.render('error');
});

module.exports = app;
