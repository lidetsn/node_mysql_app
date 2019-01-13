# An Amazon-like storefront with the MySQL

This app has Three parts
 #1: Customer View 

     Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

. The app  then prompt users with two messages.

   * The first  ask them the ID of the product they would like to buy.
   * The second message  ask how many units of the product they would like to buy.

. Once the customer has placed the order, the application  check if the store has enough of the product to meet the customer's request.

   * If not, the app log a phrase  `Insufficient quantity!`, and then prevent the order from going through.

. However, if the store _does_ have enough of the product, it fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, it shows the customer the total cost of their purchase.


 #2: Manager View
  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it  list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it  allows the manager to add a completely new product to the store.

  #3: Supervisor View

        Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

      * When a supervisor selects `View Product Sales by Department`, the app  display a summarized table in their terminal/bash window.
      * If a supervisor selects `create New Department`, it  allows the supervisor to add a completely new department.


i attached the link to the video of how the app is working, you can also find the screenshot of each for your reference !!

https://drive.google.com/file/d/1dqb3xvQAZFUMFtIzUvUo0TZtU6bKzFlC/view

Enjoy

Author Lidetu S Neshnega