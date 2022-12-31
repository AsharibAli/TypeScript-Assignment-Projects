#!/usr/bin/env node
import { Bank } from "./Bank.js";
import prompt from 'prompt';
async function Banking() {
    let myAccount = new Bank;
    let input;
    console.log(`Starting Balance,${myAccount.getBalance}\n`);
    console.log('Make a Debit Transaction');
    input = Number((await prompt.get([{ name: "Input", description: "Enter Amount : ", type: "number", conform: (value) => { if (isNaN(value)) {
                return false;
            } return true; } }])).Input);
    console.log(myAccount.Debit(input));
    console.log('\nMake a Credit Transaction');
    input = Number((await prompt.get([{ name: "Input", description: "Enter Amount : ", type: "number", conform: (value) => { if (isNaN(value)) {
                return false;
            } return true; } }])).Input);
    console.log(myAccount.Credit(input));
    console.log(`Your final balance : ${myAccount.getBalance}`);
}
Banking();
