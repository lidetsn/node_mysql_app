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
    console.log("connected as id " + connection.threadId + "\n");
   listMenu();
  });
  
  
  function listMenu() {
          inquirer
            .prompt({
              name: "action",
              type: "list",
              message: "What would you like to do?",
              choices: [       
                          "View Product Sales by Department",     
                          "Create New Department",                  
                        ]
                        })
            .then(function(answer) {
              switch (answer.action) {
              case "View Product Sales by Department":
                viewProductsSaleByDepartment();
                break;
        
              case "Create New Department":
                createNewDepartment();
                break;
        
        }
      });
  }
 /* | department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |
*/
  function  viewProductsSaleByDepartment() {
          var table = new Table({
            head: ['Department_ID', 'Department_name', 'Over_head_costs','Product_sales','Total_profit'],
            style: {'padding-left': 0 }
        });

       console.log("Selecting all products...\n");
       var query= "SELECT departments.department_id,departments.department_name,departments.over_head_costs, sum(products.product_sales) as Total_product_sales , (sum(products.product_sales)-departments.over_head_costs) as total_profit FROM products  INNER JOIN departments on(products.department_name=departments.department_name) group by department_name";

                  connection.query(query, function(err, res) {
                      if (err) throw err;
                      
                      for (var i = 0; i < res.length; i++) {

                        var itemId = res[i].department_id,
                            depName=res[i].department_name,
                            overHeadCost = res[i].over_head_costs,                  
                            TotalProductSale = res[i].Total_product_sales ,
                            TotalProfit=res[i].total_profit

                          table.push( [itemId,depName,overHeadCost,TotalProductSale,TotalProfit]  );
                }
                            console.log("");
                            console.log("\n"+"Items based on departments")
                            console.log(table.toString());
                            console.log("");
                      
                    
                  });
                  setTimeout(promptUser,1000)
}

function    createNewDepartment() {
          console.log("Inserting a new department...\n");
          inquirer
          .prompt([
              
            {
              name: "department_name",
              type: "input",
              message: "Enter the department Name : ",
            
            } ,  
            {
              name: "over_head_cost",
              type: "input",
              message: "Enter the the over head cost : ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            } ,      
            
          ])
    .then(function(answer) {
          console.log("Inserting a new product...\n");
          var query = connection.query(
          "INSERT INTO departments SET ?",
{
  
        department_name: answer.department_name,
        over_head_costs: answer.over_head_cost
},
function(err, res) {
  console.log(res.affectedRows + " department inserted!\n");
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
  
 

     
