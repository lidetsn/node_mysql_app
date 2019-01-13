
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(item_id INT AUTO_INCREMENT NOT NULL , product_name VARCHAR(100) NOT NULL,department_name VARCHAR(100) NOT NULL,price DECIMAL(10,2) NOT NULL,stock_quantity INT,product_sales  DECIMAL(10,2) default 0.00, PRIMARY KEY (item_id));
CREATE TABLE departments( department_id INT AUTO_INCREMENT NOT NULL,department_name VARCHAR(100) NOT NULL,over_head_costs DECIMAL(10,2) NOT NULL, PRIMARY KEY(department_id) );


