var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("easy-table"); 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("==========================");
    console.log("Connection Successful!");
    console.log("==========================");
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: 
        [
        "View Products for Sale", 
        "View Low Inventory", 
        "Add New Product",
        "Add to Inventory",          
        "Quit"
        ]
    }]).then(function (answer) {
        switch (answer.selection) {
            case "View Products for Sale": 
            showProducts();
            break;

            case "View Low Inventory": 
            lowInventory();
            break;

            case "Add New Product": 
            newProduct();
            break;

            case "Add to Inventory": 
            addInventory();
            break;            

            case "Quit": 
            console.log("====================");
            console.log(" Connection closed!");
            console.log("====================");
            closeConnection();
            break;
        }
    });
}

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("");
        var t = new Table;
        
        res.forEach(function (item) {
            t.cell("Item ID", item.id);
            t.cell("Products", item.product_name);
            t.cell("Department", item.department_name);
            t.cell("Price (USD)", item.price, Table.number(2));
            t.cell("Quantity", item.stock_quantity)
            t.newRow();
        });
        console.log(t.toString()); 
        start();
    });
}

//display inventory that are less than 5
function lowInventory() {
    console.log("");    
    console.log("<<<<<<<<<<<<<<<<<<<<<<< Products w/ Inventory of 5 or Less >>>>>>>>>>>>>>>>>>>>>>>>\n");
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {                            
                console.log("Item ID: " + res[i].id);
                console.log("Product: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + res[i].stock_quantity);
                console.log("===================================");
            }
        }
        start();
    });
}

//new product function
function newProduct(){
    inquirer.prompt([
      {
        type: "input",
        name: "product",
        message: "What item would you like to add?"
      },
      {
        type: "input",
        name: "department",        
        message: "Please input the department of the new item: "        
      },
      {
        type: "input",
        name: "price",        
        message: "What is the price of the new item?"        
      },
      {
        type: "input",
        name: "quantity",        
        message: "Please input the quantity of the new item: "        
      }
    ]).then(function(answer){
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, res) {
          console.log ("=================\n")
          console.log (" New item added!\n")
          console.log ("=================\n")
          showProducts();        
      });
    });
  }

function addInventory(){
    showProducts();
}

function closeConnection() {
    connection.end();
};