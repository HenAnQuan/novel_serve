// const mysql = require('mysql');
// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'address_list',
//     post: 3306
// });

const mysql = require("mysql");
var pool= mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:"root",
    password:"",
    database:"novel"
})


const query=function(sql,options){
    return new Promise((resolve,resject)=>{
        pool.getConnection(function(err, connection) {
            if (err) return resject(err);
            connection.query(sql, options, function(err2, result) {
                if (err2){
                    resject(err2);
                }else{
                    resolve(result);
                }
                connection.release(); // 释放连接池
            });
        });
    });
}


module.exports=query;