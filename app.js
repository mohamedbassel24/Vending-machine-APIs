var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var vendingMachineRouter = require('./routes/vending');

var birdsRouter = require('./routes/birds');

// Require the routing files
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Mongo DB


mongoose.Promise = global.Promise;

// Connecting to the database
const my_connection=mongoose.connect('mongodb://localhost:27017/VendingDB', {
    useNewUrlParser: true
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//
app.use('/', vendingMachineRouter);
app.use('/birds',birdsRouter);
//Use User Routes
app.use('/user',usersRouter)
//Use Product Routes
app.use('/product',productRouter)
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
try{
afterAll(async () => {
  await mongoose.connection.close();
});}
catch(err)
{
  console.log('Developing Mode =>')
}
module.exports = app;
