import inquirer from "inquirer";
import gradient from 'gradient-string';
import figlet from 'figlet';

// Wait for user input
const answers: {
    numberOne: number
    numberTwo: number
    operator: string

} = await inquirer.prompt([
    {
    type: "number",
    name: "numberOne",
    message: "kindly enter your first no: "
    },
    {
    type: "number",
    name: "numberTwo",
    message: "kindly enter your second no: "
    },
    {
    type: "list",
    choices: ["*", "+", "-", "/"],    
    name: "operator",
    message: "Select Operatoe: "
    },
])


const { numberOne, numberTwo, operator } = answers;
if (numberOne && numberTwo && operator) {
    let result: number = 0
    if (operator === "+") {
        result = numberOne + numberTwo
    } else  if (operator === "-") {
        result = numberOne - numberTwo
    }  if (operator === "/") {
        result = numberOne / numberTwo
    }  if (operator === "*") {
        result = numberOne * numberTwo
    } 

    console.log(figlet.textSync('Your result is: ' + result));
    
} else {
    console.log(gradient.rainbow("Kindly Enter Valid Input"));
    
}
