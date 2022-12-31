#! /usr/bin/env node
import inquirer from 'inquirer'
import prompt from 'prompt'

interface StudentInterface{
    id:string,
    name:string,
    coursesEnrolled:string[],
    balance:number
}

interface Question{
    name:string,
    type:string,
    message?:string,
    default?:string,
    choices?:string[],
    validate?:()=>{}
}

interface feeStructureInterface{
    [x:string]:number;
}

let feeStructure:feeStructureInterface={
    'Blockchain':-200,'Artificial Intelligence':-250,'Cyber Security':-140,'Internet Of Things':-590,'Computational Genomics':-300
}

let studentsList:StudentInterface[]=[];

let mainQuestion:Question={
    name:'mainSelection',
    type:'rawlist',
    choices:['New Student','enroll','view balance','pay tuition fees','show status','de enroll','exit']
}

let courseQuestion:Question={
    name:'courseSelection',
    type:'checkbox',
    message:'Choose from the given',
    choices:['Blockchain','Artificial Intelligence','Cyber Security','Internet Of Things','Computational Genomics']
}

let customInput:Question={
    name:'input',
    type:'input'
}

let randomIDGenerator=():string=>{
    let id:string='';
    for(let i=0;i<5;i++){
        id+=String(Math.floor(Math.random()*5));
    }
    return id;
}

let calculateFee=<T extends StudentInterface>(student:T)=>{
    student.balance=0;
    student.coursesEnrolled.forEach(course=>{
        if(feeStructure.hasOwnProperty(course)){
            student.balance+=feeStructure[course];
        }
    })
};

async function main() {
    //let num=await prompt.get(['']);
    //console.log(num);
    let mainChoice:string
    do{
        mainChoice=(await inquirer.prompt(mainQuestion)).mainSelection;
        switch(mainChoice){
        case 'New Student':{
            const newID=randomIDGenerator();
            customInput.message="Student Name : "
            let newName:string=(await inquirer.prompt((customInput))).input;
            let courseChoice:string[]=(await inquirer.prompt(courseQuestion)).courseSelection;
            let tempStudent:StudentInterface={
                id:newID,
                name:newName,
                coursesEnrolled:[...courseChoice],
                balance:0
            };
            calculateFee(tempStudent);
            studentsList.push(tempStudent);
            console.log(studentsList);
            break;
        }
        case 'enroll':{
            customInput.message="Student ID : ";
            let updatedFee:number=0;
            let studntID:string=(await inquirer.prompt(customInput)).input
            let courseChoice:string[]=(await inquirer.prompt(courseQuestion)).courseSelection;
            courseChoice.forEach(course=>{updatedFee-=feeStructure[course];})
            let studentFound:boolean=false;
            (studentsList.forEach(
                element=>{if(element.id===studntID){
                    element.coursesEnrolled.push(...courseChoice);studentFound=true;
                    element.balance-=updatedFee;
                    console.log(`Courses after new enrollment :: ${element.coursesEnrolled}`);
                    }
                }
            ));
            if(!studentFound){
                console.log("\nStudent not found, please enter valid existing ID\n");
            }
            break;
        }
        case 'view balance':{
            customInput.message="Student ID : ";
            let studntID:string=(await inquirer.prompt(customInput)).input;
            let studentFound:boolean=false;
            studentsList.forEach(element=>{
                if(element.id===studntID){
                    console.log(`Student Balance :${element.balance}`);
                    studentFound=true;
                }
            });
            if(!studentFound){
                console.log("\nStudent not found, please enter valid existing ID\n");
            }
            break;
        }
        case 'pay tuition fees':{
            customInput.message="Student ID : ";
            let studntID:string=(await inquirer.prompt(customInput)).input;
            customInput.message="Amount : ";
            customInput.type='number';
            let feeAmount:number=(await inquirer.prompt(customInput)).input;
            customInput.type='string';
            let studentFound:boolean=false;
            studentsList.forEach(element=>{
                if(element.id===studntID){
                    if(feeAmount+element.balance>0){
                        console.log(`Extra amount :${feeAmount+element.balance}`);
                        feeAmount+=element.balance;
                        element.balance=0;
                    }else if(feeAmount+element.balance===0){
                        feeAmount=0;element.balance=0;
                    }else{
                        element.balance+=feeAmount;
                        feeAmount=0;
                    }
                    console.log(`Remaingin fee :${element.balance}`)
                    studentFound=true;
                }
            });
            if(!studentFound){
                console.log("\nStudent not found, please enter valid existing ID\n");
            }
            break;
        }
        case 'show status':{
            customInput.message="Student ID : ";
            let studntID:string=(await inquirer.prompt(customInput)).input;
            studentsList.forEach(student=>{
                if(student.id===studntID){
                    console.log(student);
                }
            });
            break;
        }
        case 'de enroll':{
            customInput.message="Student ID : ";
            let studntID:string=(await inquirer.prompt(customInput)).input;
            let de_Enroll:string[]=(await inquirer.prompt(courseQuestion)).courseSelection;

            studentsList.forEach(student=>{
                if(student.id===studntID){
                    de_Enroll.forEach(course=>{
                        let removeIndex:number=student.coursesEnrolled.indexOf(course);
                        student.coursesEnrolled.splice(removeIndex,1);
                        student.balance+=(-feeStructure[course]);
                    });   
                }
            })
        }
    }
    }while(mainChoice!='exit')
}

main();