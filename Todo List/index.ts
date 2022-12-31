import inquirer from "inquirer";

let todos: string[] = [];
let loop = true;

while (loop) {
    const answers: {
        TODO: string,
        addmore: boolean
    } = await inquirer.prompt([
        {
            type: "input",
            name: "TODO",
            message: "what do you want to do in your todo?"
        },
        {
            type: "confirm",
            name: "addmore",
            message: " Do you want to add more todo?",
            default: false
        },
    ])
    const { TODO, addmore } = answers;
    console.log(answers);
    
    loop = addmore
    if (TODO) {
        todos.push(TODO)
    } else {
        console.log("Kindly Add Valid Input");
    }
}

if (todos.length > 0) {
    console.log("Your Todo Lst:");
    todos.forEach(todo => {
        console.log(todo);
        
    });
} else {
    console.log("No Todos Found!");
    
}


























