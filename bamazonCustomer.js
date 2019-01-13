var mysql=require("mysql");
var inquirer=require("inquirer");
var Table=require("cli-table")

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
    readProducts();
  });
  
  function readProducts() {

        var table = new Table({
              head: ['ID', 'Item', 'Price'],
              colWidths: [10, 50, 30],
              style: {'padding-left': 0 }
          });

          connection.query("SELECT item_id,product_name,price FROM products", function(err, res) {
              if (err) throw err;
          
              for (var i = 0; i < res.length; i++) {

                         var itemId = res[i].item_id,
                             productName = res[i].product_name,                  
                             price = "$ "+ res[i].price
                            table.push( [itemId, productName, price]  );
                  }
                  console.log("");
                  console.log("\n"+"ITEMS AVAILABLE FOR SALE")
                  console.log(table.toString());
                  console.log("");
                  //   continuePrompt();
            console.log("Enter Item Id and quantity you want to purchase")
            console.log("----------------------------------------------------"+"\n")
            getRequest()
          });
  }
function getRequest(){
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter the item id: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "amount",
        type: "input",
        message: "Enter amount: ",
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
      var query = "SELECT item_id,product_name,price,stock_quantity,product_sales FROM products WHERE ?";

           connection.query(query, {item_id:answer.item_id}, function(err, res) {
                  quantity=parseInt( res[0].stock_quantity);
                  amt=parseInt(answer.amount)
            
                if(amt>quantity){
                      console.log("sorry insuficient amount in the stock")
                 }

                else{
               connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: quantity-amt,
                        product_sales:(amt*res[0].price) + res[0].product_sales
                      },
                      {
                        item_id: answer.item_id
                      }
                    ],
                
              );            
                        var table = new Table({                       
                              colWidths: [25, 50],
                              style: {'padding-left': 0 }
                      });

                      table.push(["Item id",res[0].item_id])
                      table.push(["Product Name",res[0].product_name])
                      table.push(["Unit price","$"+res[0].price])
                      table.push(["Total quantity ordered",amt])
                      table.push(["Total price","$"+(amt*res[0].price).toFixed(2)])
                      console.log("\n\n"+"Bamazon plc")
                      console.log("your Invoice")
                      console.log(table.toString());
                      //console.log("Thank you for your purchase !! Come again ")  
                      
                      promptUser()
            }
      })
      
     
    })
  }
  function promptUser(){
    inquirer
    .prompt([
      {
        name: "response",
        type: "conform",
        message: "do you want to purchase more?(y/N): ",
      }
    ])
        .then(function(answer) {

          if(answer.response==="y"){
            getRequest();
          }
          else{
          console.log("\n"+"Thank you for your purchase !! Come again ")  
          }
        })
      }
  