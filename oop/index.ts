#!/usr/bin/env node
import { Person } from "./Person.js";
import { Student } from "./student.js";
import prompt from 'prompt'

async function main() {
    const input= Number((await prompt.get([{name:"input",description:"What is your personality, 1 to talk to others, 2 to talk to yourself\n",type:"number",conform:(value)=>{if(isNaN(value)){return false;}return true;}}])).input);
    console.log(input,typeof(input));

    let newPerson=new Person;
    let newStudent=new Student;

    //console.log(newPerson.getPeronality());
    newPerson.setPersonality(input);
    console.log(newPerson.getPeronality());

    let name=String((await prompt.get([{name:"Name",description:"Your name?"}])).Name);
    newStudent.setName=name;
    console.log(`Your name is : ${newStudent.getName}, your personality is ${newStudent.getPeronality()}`);
}

main();