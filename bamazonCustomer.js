
var mysql = require("mysql"); 
var inquirer = require("inquirer"); 
var Table = require("easy-table"); 


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",    
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("===============================================");        
    console.log("     _")
    console.log(" _n_|_|_,_  Welcome to CamShop!")
    console.log("|===.-.===| Your small authorized seller of")
    console.log("|  ((_))  | Cameras and Camera's Accessories!")
    console.log("'==='-'===' Please check out our selection!\n")
    console.log("===============================================\n\n");
    showProducts();
  });


function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
                 
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

        
        inquirer.prompt([{
            type: "input",
            name: "id",
            message: "Please select the item ID of the product that you would like to purchase."
        }, {
            type: "input",
            name: "quantity",
            message: "Please specific the quantity you would like to purchase."

        }]).then(function (answers) {

            connection.query("SELECT * FROM products WHERE id = " + answers.id, function (err, res) {

                var currentPrice = res[0].price;
                var total = (answers.quantity * currentPrice).toFixed(2)


                if (res[0].stock_quantity < answers.quantity) {
                    console.log("\n");                    
                    console.log("============================================================\n");
                    console.log("***Sorry, not enough inventory. Please select again.***\n");
                    console.log("============================================================\n");
                    showProducts();
                } else {
                    connection.query("UPDATE products SET stock_quantity = stock_quantity - " + answers.quantity + " WHERE id = " + answers.id, function (err, res) {
                        console.log("===============================================");
                        console.log("Inventory has been updated!");
                        console.log("Your total is: $" + total);
                        console.log("Thanks for shopping! Check us out again soon!");
                        console.log("===============================================\n");
                        closeConnection();
                    });                   
                }               
            })
        });
    });
};

function closeConnection() {
    connection.end();
};