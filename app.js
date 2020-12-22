var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//改动1// 利用 CORS 解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // *允许任意地址访问。解决跨域后携带cookie问题req.headers.origin
    // res.header("Access-Control-Allow-Credentials", "true"); //是否包含cookie，如果不包含，可省略
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,Cookie,Accept,Token,Origin');
    next(); // 继续下一个中间件的处理
});

//改动2 //统一进行路由拦截:session、cookie版
// app.all('*', (req, res, next) => {
//     console.log('请求地址',req.url);
//     if (req.url == '/pages/login' || req.url == '/users/login' || req.url =='/users/register') { // 如果是登录页或者是登录请求和注册请求
//         next(); // 该干嘛干嘛去
//     } else {
//         if (req.session.sign) { // 判断权限
//             next(); // 登陆后想访问什么页面直接访问
//         } else {
//             res.redirect('/pages/login'); // 未登录，重定向到登录页
//         }
//     }
//     console.log('权限',req.session.sign);
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('服务器500错误：', err); //改动3
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;