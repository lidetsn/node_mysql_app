CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(item_id INT AUTO_INCREMENT NOT NULL , product_name VARCHAR(100) NOT NULL,department_name VARCHAR(100) NOT NULL,price DECIMAL(10,2) NOT NULL,stock_quantity INT,product_sales  DECIMAL(10,2) default 0.00, PRIMARY KEY (item_id));



INSERT INTO products(product_name,department_name,price,stock_quantity)
           VALUES("usb charger","Computers & Accessories",12.45,100),
                 ("USB C to HDMI Adapter","Computers & Accessories",26.50,200),
                 ("Himalayan Salt Scrub","Health & Beauty",15.90,77),
                 ("Replacement Brush Heads","Health & Beauty",11.18,100),
                 ("Rug Doctor Deep Carpet Cleaner","Home & Kitchen",249.60,40),
                 ("Philips Digital Air Fryer","Home & Kitchen",159.75,50),
                 ("Gable Live Edge Dining Table","Furniture & Mattresses",699.90,20),
                 ("TRINITY Stainless Steel Prep Table","Furniture & Mattresses",128.90,20),
                 ("On a Cold Dark Sea","Books",7.50,100),
                 ("Crazy Little Thing","Books",6.50,200),
                 ("Head Youth Full Zip","Clothing",12.50,50),
                 ("OshKosh Fleece Hoodie","Clothing",10.50,100);

CREATE TABLE departments( department_id INT AUTO_INCREMENT NOT NULL,department_name VARCHAR(100) NOT NULL,over_head_costs DECIMAL(10,2) NOT NULL, PRIMARY KEY(department_id) );

INSERT INTO departments (department_name,over_head_costs)
           
            VALUES("Computers & Accessories",20000),
				  ("Health & Beauty",15000),
                  ("Home & Kitchen",20000),
                  ("Furniture & Mattresses",32000),
                  ("Books",9000),
                  ("Clothing",11000);
                  