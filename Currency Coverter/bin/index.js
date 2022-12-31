import inquirer from "inquirer";
let convertion = {
    "PKR": {
        "USD": 0.0044345898004435,
        "GBP": 0.0037,
        "PKR": 1
    },
    "GBP": {
        "USD": 1.21,
        "PKR": 271.79,
        "GBP": 1
    },
    "USD": {
        "PKR": 225.50,
        "GBP": 0.83,
        "USD": 1.00
    }
};
const answer = await inquirer.prompt([
    {
        type: "list",
        name: "from",
        choices: ["PKR", "USD", "GBP"],
        message: "Select Your Currency: "
    },
    {
        type: "list",
        name: "to",
        choices: ["PKR", "USD", "GBP"],
        message: "Select Your Convertion Currency: "
    },
    {
        type: "number",
        name: "amount",
        message: "Enter your convertion amount: "
    }
]);
const { from, to, amount } = answer;
if (from && to && amount) {
    let result = convertion[from][to] * amount;
    console.log(`Your Convertion from ${from} to ${to} is ${result}`);
}
else {
    console.log("Invalid Inputs");
}
