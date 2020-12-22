var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World！' });  //渲染views/index.ejs文件
});

module.exports = router;