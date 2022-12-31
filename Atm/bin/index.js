#!/usr/bin/env node
import inquirer from "inquirer";
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "userId",
        message: "Kindly Enter your Id: "
    },
    {
        type: "number",
        name: "userPin",
        message: "Kindly Enter your Pin: "
    },
    {
        type: "list",
        name: "accountType",
        choices: ["Current", "Saving"],
        message: "Select your account type:",
    },
    {
        type: "list",
        name: "transactionType",
        choices: ["Fast Cash", "Withdrawal"],
        message: "Select your transaction:",
        when(answers) {
            return answers.accountType;
        },
    },
    {
        type: "list",
        name: "amount",
        choices: [1000, 2000, 10000, 20000],
        message: "Select your amount:",
        when(answers) {
            return answers.transactionType === "Fash Cash";
        },
    },
    {
        type: "number",
        name: "amount",
        message: "Enter your amount:",
        when(answers) {
            return answers.transactionType === "Withdrawal";
        },
    },
]);
if (answers.userId && answers.userPin) {
    const balance = Math.floor(Math.random() * 1000000);
    console.log(balance);
    const EnteredAmount = answers.amount;
    if (balance >= EnteredAmount) {
        const remaining = balance - EnteredAmount;
        console.log("Your Remaining Balance is ", remaining);
    }
    else {
        console.log("Insuficeient Balance");
    }
}
