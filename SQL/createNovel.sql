SET NAMES UTF8;
DROP DATABASE IF EXISTS novel;
CREATE DATABASE novel CHARSET=UTF8;
USE novel;


/**  用户信息表  **/
CREATE TABLE user(
	id INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(16) NOT NULL,
	upwd VARCHAR(16) NOT NULL
);

/**  书架信息  **/
CREATE TABLE book_list(
	book_list_id INT PRIMARY KEY AUTO_INCREMENT,
	book_id  VARCHAR(32),
	user_id INT,
	FOREIGN KEY(user_id) REFERENCES user(id)
);


INSERT INTO user VALUES(1,'doudou','123456');
INSERT INTO book_list VALUES(1,'5a4e0cb28408f11c495a29e9',1);
INSERT INTO book_list VALUES(2,'50864bf69dacd30e3a000014',1);
