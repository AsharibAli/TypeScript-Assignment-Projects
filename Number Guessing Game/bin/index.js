import inquirer from "inquirer";
const systemgeneratednumber = Math.floor(Math.random() + 1);
const answers = await inquirer.prompt([
    {
        type: "number",
        name: "userGuess",
        message: "Write your guess b/w 1 to 10: "
    }
]);
const { userGuess } = answers;
console.log(userGuess, "userGuess", systemgeneratednumber, "Sys");
if (userGuess === systemgeneratednumber) {
    console.log("yaaa Your Answer is correct \n you Won!");
}
else {
    console.log("please try again better luck next time");
}
