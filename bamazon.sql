DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GoPro Hero 6", "Action Cam", 399.00, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony a6500", "Camera", 999.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50mm f/1.4", "Lens", 500.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canon 5D Mark IV", "Camera", 2999.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony Tripod", "Accessories", 40.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("35mm f/1.4", "Lens", 398.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Osmo Mobile 2", "Accessories", 129.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lowepro ProTactic 450", "Accessories", 150.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony a6000", "Camera", 549.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony a7R III", "Camera", 1499.99, 1);

SELECT * FROM products;