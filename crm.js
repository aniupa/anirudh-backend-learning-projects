"use strict";
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const crm = {
  cart: [],
  paymentMode: "cash",
  inventory: [
    { gadget: "phone", price: 300, quantity: 4 },
    { gadget: "tv", price: 220, quantity: 6 },
    { gadget: "gamingConsole", price: 150, quantity: 4 },
  ],
  pay: async function () {
    const total = await calculateTotalPrice();
    const amountQuery = await query(`your billing amount is ₹${total} 
      please enter the amount`);

    if (Number(amountQuery) > total) {
      const change = Math.round(amountQuery - total);
      console.log(`Here's your change of ₹${change}`);
      console.log(`Thank you...`);
      crm.cart = []; // Clear the cart after payment
      return change;
    } else if (Number(amountQuery) === total) {
      console.log(`Thank you...`);
      crm.cart = []; // Clear the cart after payment
      return 0;
    } else if (isNaN(Number(amountQuery))) {
      console.log("Please enter a valid number for payment amount");
      return await crm.pay();
    } else {
      console.log(`You do not have enough money to pay Please try again`);
      return await crm.pay();
    }
  },
};

async function query(qns) {
  return new Promise((res, rej) => {
    rl.question(qns, function (input) {
      if (input === "") {
        return rej("please enter something");
      }
      return res(input.trim().toLowerCase());
    });
  });
}
async function addItem() {
  const addItemQuery = await query(
    "Enter the name of item you want to add in cart",
  );

  const search = crm.inventory.find((item) => {
    return item.gadget.toLowerCase() === addItemQuery;
  });
  const index = crm.inventory.findIndex(
    (item) => item.gadget.toLowerCase() === addItemQuery,
  );
  if (!search) {
    console.log("item not found ");
  } else if (search.quantity > 0 && search) {
    crm.cart.push({
      gadget: search.gadget,
      price: search.price,
    });
    console.log(`Item ${search.gadget} added to cart`);
    search.quantity -= 1;
  } else if (search.quantity === 0) {
    crm.inventory.splice(index, 1);
    console.log(
      `Item ${search.gadget} is out of stock and removed from inventory`,
    );
  }
}
async function calculateTotalPrice() {
  return new Promise((res) => {
    const total = crm.cart.reduce((acc, cost) => acc + cost.price, 0);
    console.log(`total price of the products inside cart is : ₹${total}`);

    const discount =
      total > 400
        ? `you'r eligible for 10% discount you get discount of ₹${total / 10} on your purchase
        Amount to Pay = ${total - total / 10}`
        : " total amount is below 400 :you are not eligible for discount";

    console.log(discount);
    crm.cart.forEach((item) => {
      console.log(`gadget :${item.gadget} \n price : ₹${item.price}`);
    });
    const discountedTotal =
      total > 400 ? Number(total - Number((total / 10).toFixed(2))) : total;
    res(discountedTotal);
  });
}
function exit() {
  rl.close();
  return console.log("Thank you for using our service!");
}
async function listCart() {
  console.table(crm.cart);
}
function inventory() {
  console.table(crm.inventory);
}
module.exports = {
  crm,
  addItem,
  calculateTotalPrice,
  listCart,
  exit,
  inventory,
  query,
};
