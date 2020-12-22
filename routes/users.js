var express = require("express");
var router = express.Router();
const query = require("../module/mysqlModule.js");

/* GET users listing. */

router.get("/user", function (req, res, next) {
  const { uname } = req.query;
  const sql = `SELECT * FROM user WHERE uname=?`;
  // query(sql, ["doudou"])
  query(sql, [uname])
    .then((data) => {
      if(data==""){
        res.json({state: "404",Info:"用户名不存在"})
      }else{ 
        res.json({state: "200",Info:"用户存在"})
      }
    })
    .catch((err) => {
      res.json({
        state: "0",
        msg: "",
        err,
      });
    });
});

router.get("/upwd", function (req, res, next) {
  const { uname,upwd } = req.query;
  const sql = `SELECT * FROM user WHERE uname=? AND upwd=?`;
  // query(sql, ["doudou"])
  query(sql, [uname,upwd])
    .then((data) => {
      if(data==""){
        res.json({state: "404",Info:"用户名或密码错误"})
      }else{
        let uname = data[0].uname;
        let sqlbookList = `select book_id,user_id from book_list,user where user_id=id and uname=?;`
        // 当登录成功时，查询数据库中用户书架中的书籍id,并返回数据
        query(sqlbookList,[uname]).then(data=>{
          res.json({state:"200",data})
        })
        // res.json({state: "200",data})
      }
    })
    .catch((err) => {
      res.json({
        state: "0",
        msg: "",
        err,
      });
    });
});

router.get("/register", function (req, res, next) {
  const { uname,upwd } = req.query;
  const sql = `INSERT INTO user (uname,upwd) VALUES(?,?)`;
  // query(sql, ["doudou"])
  query(sql, [uname,upwd])
    .then((data) => {
      if(data==""){
        res.json({state: "404",Info:"用户名或密码错误"})
      }else{
        res.json({state: "200",data})
      }
    })
    .catch((err) => {
      res.json({
        state: "0",
        msg: "",
        err,
      });
    });
});

router.get("/test", function (req, res, next) {
  const arr = req.query.bookId;
  const userId = req.query.user_id;
  console.log(req.query);
  var affectedRows = 0;
  var success = false;
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    let sql = `INSERT INTO book_list (book_id,user_id) VALUES ('${arr[i]}',${userId});`
    // query(sql).then(data=>{
    // let sql = `INSERT INTO book_list (book_id,cccuser_id) VALUES (?,?);`
    console.log(sql);
    query(sql,[`${arr[i]},${userId}`]).then(data=>{
      // console.log(data);
      // console.log(data.affectedRows);
      if(data && data.affectedRows>=1){
        affectedRows += data.affectedRows;
      }
      if(i==arr.length-1){
        if(affectedRows > 0){
          res.json({
            state:"200",
            Info:"upload success",
            affectedRows:affectedRows
          });
        }else{
          res.json({
            state:"404",
            Info:"upload err",
            affectedRows:affectedRows,
          });
        }
      }
    })
  };

});

router.get("/xixi2", function (req, res, next) {
  const { name } = req.query;
  const sql = `SELECT user_tel FROM users WHERE user_name=?`;
  query(sql, [name])
    .then((data) => {
      res.json({
        state: "200",
        data,
      });
    })
    .catch((err) => {
      res.json({
        state: "0",
        msg: "查找失败",
        err,
      });
    });
});

module.exports = router;
