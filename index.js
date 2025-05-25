const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const crmObj = require("./crm.js");
const {
  crm,
  addItem,
  calculateTotalPrice,
  listCart,
  exit,
  inventory,
  query: ask,
} = crmObj;
const pay = crm.pay;
async function cases(userChoice) {
  switch (userChoice) {
    case "additem":
      {
        await addItem();
      }
      break;
    case "pay":
      {
        await pay();
      }
      break;
    case "totalprice":
      {
        await calculateTotalPrice();
      }
      break;
    case "listcart":
      {
        await listCart();
      }
      break;
    case "exit":
      {
        exit();
      }
      break;
    case "inventory":
      {
        inventory();
      }
      break;
    default: {
      throw new Error("you did not selected any options...");
    }
  }
  return await main();
}
async function main() {
  try {
    const userChoice = await ask(
      "What do you want to do? [addItem | pay | totalPrice | listCart | inventory | exit]: ",
    );
    await cases(userChoice);
  } catch (err) {
    console.log("something happened", err);
    rl.close();
    return;
  }
}
main();
