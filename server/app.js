require('dotenv').config()
// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const mongoose = require('mongoose')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//mongoose
let database = process.env.DATABASE_DEV
if (process.env.NODE_ENV == 'test') {
    database = process.env.DATABASE_TEST
} else if (process.env.NODE_ENV == 'prod') {
    database = process.env.DATABASE_PROD
}

mongoose.connect(database, { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function(){
    console.log(`Database in connect ${process.env.NODE_ENV}`);
})

//require routes
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')


app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/task', taskRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json(err.message);
// });

app.listen(3000, function(){
  console.log('Running at port 3000...')
})

module.exports = app;
