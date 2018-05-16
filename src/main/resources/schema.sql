CREATE TABLE IF NOT EXISTS USER (
uid int(10) NOT NULL AUTO_INCREMENT,
username VARCHAR (30) NOT NULL,
password VARCHAR (100) NOT NULL,
email VARCHAR (50) not NULL
);

INSERT INTO USER (username, password, email) VALUES ('David', '123456', 'david@example.com');
INSERT INTO USER (username, password, email) VALUES ('Peter', '123456', 'peter@example.com');

CREATE TABLE IF NOT EXISTS ORDERS (
  id int(10) NOT NULL AUTO_INCREMENT,
  orderNum VARCHAR(100) NOT NULL,
  orderTime int(11) NOT NULL,
  userId int(10) NOT NULL,
  productId int(10) NOT NULL,
  amount decimal(8,2) NOT NULL DEFAULT 0.00,
  status VARCHAR(20) NOT NULL DEFAULT 'Waiting for payment',
);

CREATE TABLE IF NOT EXISTS PRODUCT (
  id int(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(200),
  price decimal(8,2) NOT NULL DEFAULT '0.00',
);

INSERT INTO PRODUCT (name, description, price) VALUES ('Model X', 'The Best SUV', 87.60);
INSERT INTO PRODUCT (name, description, price) VALUES ('Model S', 'The Best Car', 82.20);
INSERT INTO PRODUCT (name, description, price) VALUES ('Model 3', 'More affordable electric car', 35.00);