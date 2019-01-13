var mysql=require("mysql");
var inquirer=require("inquirer");
var Table=require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Lidet",
    database: "bamazon"
  });


  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   listMenu();
  });
  
  
  function listMenu() {
          inquirer
            .prompt({
              name: "action",
              type: "list",
              message: "What would you like to do?"+"\n\n",
              choices: [       
                          "View Products for Sale"+"\n",     
                          "View Low Inventory"+"\n",                  
                          "Add to Inventory"+"\n",                  
                          "Add New Product"
                        ]
                        })
      .then(function(answer) {

        switch (answer.action) {
        case "View Products for Sale"+"\n":
          viewProductsForSale();
          break;
  
        case "View Low Inventory"+"\n":
          viewLowInventory();
          break;
  
        case "Add to Inventory"+"\n":
             addInventory();
          break;
  
        case "Add New Product":
          addNewProduct();
          break;
        }
      });
  }
      
      function viewProductsForSale() {
        var table = new Table({
          head: ['ID', 'Item','Department', 'Price','Available_Quantity','Total sale'],
         // colWidths: [10, 50,50,,30,30,30],
          style: {'padding-left': 0 }
      });
        //console.log("Selecting all products...\n");
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                
              for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName= res[i].department_name,                 
                    price = "$ "+ res[i].price
                    stockQuantity=res[i].stock_quantity,
                    sales="$ "+res[i].product_sales
                    table.push( [itemId, productName,departmentName, price,stockQuantity,sales]  );
         }
         console.log("");
         console.log("\n"+"ITEMS AVAILABLE FOR SALE")
         console.log(table.toString());
         console.log("");
                
            });
            setTimeout(promptUser,1000)
            //promptUser()
}     
//inventory les or equl 5
      function  viewLowInventory() {
        var table = new Table({
          head: ['ID', 'Item','Department', 'Price','Available_Quantity','Total sale'],
         // colWidths: [10, 50,50,,30,30,30],
          style: {'padding-left': 0 }
      });
        connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?",[0,5] ,function(err, res) {
          if (err) throw err;
          
          if(res.length===0){
            console.log("\t"+"There is no Low inventory")
          }
          else{
          for (var i = 0; i < res.length; i++) {

            var itemId = res[i].item_id,
                productName = res[i].product_name,
                departmentName= res[i].department_name,                 
                price = "$ "+ res[i].price
                stockQuantity=res[i].stock_quantity,
                sales="$ "+res[i].product_sales
                table.push( [itemId, productName,departmentName, price,stockQuantity,sales]  );
     }
     console.log("");
     console.log("\n"+"Low Inventory")
     console.log(table.toString());
     console.log("");
          
    }
        });
        setTimeout(promptUser,1000)
      }
//prompt the user to put the inventory
      function  addInventory() {
        inquirer
        .prompt([
          {
            name: "item_id",
            type: "input",
            message: "Enter the item id : ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          } ,    
          {
            name: "quantity",
            type: "input",
            message: "Enter the quantity : ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }     
        ])
        .then(function(answer) {
          var quantity
          var amt
          var query = "SELECT item_id,stock_quantity FROM products WHERE ?";
    
          connection.query(query, {item_id:answer.item_id}, function(err, res) {
                  quantity=parseInt( res[0].stock_quantity);
                  amt=parseInt(answer.quantity)
                
  
                   connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: quantity+amt,
                        
                      },
                      {
                        item_id: answer.item_id
                      }
                    ],
                    function(err, ress) {
                      console.log(ress.affectedRows + " products updated!\n");
                      setTimeout(promptUser,1000)
                    }
                  );              
                
          })

        })
       
      }

//prompt the user to put the product
      function addNewProduct() {
        inquirer
        .prompt([
          {
            name: "product_name",
            type: "input",
            message: "Enter the product Name : ",
           
          } ,    
          {
            name: "department_name",
            type: "input",
            message: "Enter the department Name : ",
           
          } ,  
          {
            name: "price",
            type: "input",
            message: "Enter the price : ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          } ,      
          {
            name: "quantity",
            type: "input",
            message: "Enter the quantity : ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }     
        ])
        .then(function(answer) {
          console.log("Inserting a new product...\n");
        var query = connection.query(
       "INSERT INTO products SET ?",
    {
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.quantity,
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      setTimeout(promptUser,1000)
    }
  );

        })
        
      }


      function promptUser(){
        inquirer
        .prompt([
          {
            name: "response",
            type: "conform",
            message: "Go Back to Main Menu?(y/N): ",
          }
        ])
            .then(function(answer) {
    
              if(answer.response==="y"){
                listMenu();
              }
              else{
              console.log("\n"+"you are loged out ")  
              }
            })
          }
      
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
   