#! /usr/bin/env node
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import inquirer from "inquirer";
let feeStructure = {
  Blockcain: -200,
  "Artificial Intelligence": -250,
  "Cyber Security": -140,
  "Internet Of Things": -590,
  "Computational Genomics": -300,
};
let studentsList = [];
let mainQuestion = {
  name: "mainSelection",
  type: "rawlist",
  choices: [
    "New Student",
    "enroll",
    "view balance",
    "pay tuition fees",
    "show status",
    "de enroll",
    "exit",
  ],
};
let courseQuestion = {
  name: "courseSelection",
  type: "checkbox",
  message: "Choose from the given",
  choices: [
    "Blockchain",
    "Artificial Intelligence",
    "Cyber Security",
    "Internet Of Things",
    "Computational Genomics",
  ],
};
let customInput = {
  name: "input",
  type: "input",
};
let randomIDGenerator = () => {
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += String(Math.floor(Math.random() * 5));
  }
  return id;
};
let calculateFee = (student) => {
  student.balance = 0;
  student.coursesEnrolled.forEach((course) => {
    if (feeStructure.hasOwnProperty(course)) {
      student.balance += feeStructure[course];
    }
  });
};
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    //let num=await prompt.get(['']);
    //console.log(num);
    let mainChoice;
    do {
      mainChoice = (yield inquirer.prompt(mainQuestion)).mainSelection;
      switch (mainChoice) {
        case "New Student": {
          const newID = randomIDGenerator();
          customInput.message = "Student Name : ";
          let newName = (yield inquirer.prompt(customInput)).input;
          let courseChoice = (yield inquirer.prompt(courseQuestion))
            .courseSelection;
          let tempStudent = {
            id: newID,
            name: newName,
            coursesEnrolled: [...courseChoice],
            balance: 0,
          };
          calculateFee(tempStudent);
          studentsList.push(tempStudent);
          console.log(studentsList);
          break;
        }
        case "enroll": {
          customInput.message = "Student ID : ";
          let updatedFee = 0;
          let studntID = (yield inquirer.prompt(customInput)).input;
          let courseChoice = (yield inquirer.prompt(courseQuestion))
            .courseSelection;
          courseChoice.forEach((course) => {
            updatedFee -= feeStructure[course];
          });
          let studentFound = false;
          studentsList.forEach((element) => {
            if (element.id === studntID) {
              element.coursesEnrolled.push(...courseChoice);
              studentFound = true;
              element.balance -= updatedFee;
              console.log(
                `Courses after new enrollment :: ${element.coursesEnrolled}`
              );
            }
          });
          if (!studentFound) {
            console.log(
              "\nStudent not found, please enter valid existing ID\n"
            );
          }
          break;
        }
        case "view balance": {
          customInput.message = "Student ID : ";
          let studntID = (yield inquirer.prompt(customInput)).input;
          let studentFound = false;
          studentsList.forEach((element) => {
            if (element.id === studntID) {
              console.log(`Student Balance :${element.balance}`);
              studentFound = true;
            }
          });
          if (!studentFound) {
            console.log(
              "\nStudent not found, please enter valid existing ID\n"
            );
          }
          break;
        }
        case "pay tuition fees": {
          customInput.message = "Student ID : ";
          let studntID = (yield inquirer.prompt(customInput)).input;
          customInput.message = "Amount : ";
          customInput.type = "number";
          let feeAmount = (yield inquirer.prompt(customInput)).input;
          customInput.type = "string";
          let studentFound = false;
          studentsList.forEach((element) => {
            if (element.id === studntID) {
              if (feeAmount + element.balance > 0) {
                console.log(`Extra amount :${feeAmount + element.balance}`);
                feeAmount += element.balance;
                element.balance = 0;
              } else if (feeAmount + element.balance === 0) {
                feeAmount = 0;
                element.balance = 0;
              } else {
                element.balance += feeAmount;
                feeAmount = 0;
              }
              console.log(`Remaingin fee :${element.balance}`);
              studentFound = true;
            }
          });
          if (!studentFound) {
            console.log(
              "\nStudent not found, please enter valid existing ID\n"
            );
          }
          break;
        }
        case "show status": {
          customInput.message = "Student ID : ";
          let studntID = (yield inquirer.prompt(customInput)).input;
          studentsList.forEach((student) => {
            if (student.id === studntID) {
              console.log(student);
            }
          });
          break;
        }
        case "de enroll": {
          customInput.message = "Student ID : ";
          let studntID = (yield inquirer.prompt(customInput)).input;
          let de_Enroll = (yield inquirer.prompt(courseQuestion))
            .courseSelection;
          studentsList.forEach((student) => {
            if (student.id === studntID) {
              de_Enroll.forEach((course) => {
                let removeIndex = student.coursesEnrolled.indexOf(course);
                student.coursesEnrolled.splice(removeIndex, 1);
                student.balance += -feeStructure[course];
              });
            }
          });
        }
      }
    } while (mainChoice != "exit");
  });
}
main();
