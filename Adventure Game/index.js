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
let getRandomNumber = (minimum, maximum) => {
  let temp = 0;
  temp = Math.floor(Math.random() * (maximum - minimum)) + minimum;
  return temp;
};
function GAME() {
  return __awaiter(this, void 0, void 0, function* () {
    let menueResponse;
    const nameQuestion = { name: "nameInput", type: "input" };
    const menueQuestion = {
      name: "menueInput",
      type: "list",
      choices: ["Play", "Quit"],
    };
    const battleQuestion = {
      name: "battleInput",
      type: "list",
      choices: ["Attack", "Defend", "Heal", "Run"],
    };
    let Questions = [nameQuestion, menueQuestion, battleQuestion];
    const enemyMaxAttack = 25;
    let enemyAttack;
    const enemyMaxHealth = 75;
    let enemyHealth;
    const playerMaxAttack = 50;
    let playerHealth;
    const playerMaxHealth = 100;
    let scorePoints = 0;
    let healingPotions = 3;
    const healingPotionEffect = 30;
    let potionDropChance = 50;
    const enemyList = ["Nawaz Sharif", "Shahbaz Sharif", "Bajwa", "Bilawal"];
    let playerName;
    let currentEnemy;
    playerName = String((yield inquirer.prompt(Questions[0])).nameInput);
    console.log(playerName);
    do {
      menueResponse = String((yield inquirer.prompt(Questions[1])).menueInput);
      if (menueResponse === "Play") {
        let firstRun = true;
        let battleResponse;
        currentEnemy = enemyList[getRandomNumber(0, 4)];
        playerHealth = playerMaxHealth;
        enemyHealth = getRandomNumber(0, enemyMaxHealth);
        enemyAttack = getRandomNumber(0, enemyMaxAttack);
        console.log(
          `\n--------------------------------------------------------------------\n`
        );
        console.log(`\t\t # ${currentEnemy} has appeared #\n`);
        console.log(`\t\t Attack : ${enemyAttack}, Health : ${enemyHealth} \n`);
        while (enemyHealth > 0 && playerHealth > 0) {
          do {
            battleResponse = String(
              (yield inquirer.prompt(Questions[2])).battleInput
            );
            firstRun = false;
            switch (battleResponse) {
              case "Attack": {
                let playerAttack = getRandomNumber(0, playerMaxAttack);
                enemyHealth -= playerAttack;
                playerHealth -= enemyAttack;
                console.log(
                  `\nYou did ${playerAttack} damage, enemy health : ${enemyHealth}\n`
                );
                console.log(
                  `Enemy did ${enemyAttack} damage, your health : ${playerHealth}\n`
                );
                break;
              }
              case "Defend": {
                let nerfedEnemyAttack = getRandomNumber(0, enemyAttack);
                playerHealth -= nerfedEnemyAttack;
                if (nerfedEnemyAttack === 0) {
                  console.log("Enemy attack nullified\n");
                } else if (nerfedEnemyAttack < enemyAttack) {
                  console.log(
                    `\nEnemy attack, reduced by : ${
                      enemyAttack - nerfedEnemyAttack
                    }\n`
                  );
                  console.log(
                    `Your received, ${nerfedEnemyAttack} damaged, Health : ${playerHealth}\n`
                  );
                } else {
                  console.log("Defense failed\n");
                }
                break;
              }
              case "Heal": {
                if (healingPotions > 0) {
                  if (playerHealth > 70) {
                    playerHealth = 100;
                  } else {
                    playerHealth += healingPotionEffect;
                  }
                  healingPotions--;
                  console.log(
                    `Healing potion used,health +${healingPotionEffect}, remaining:${healingPotions}\n`
                  );
                } else {
                  console.log("No healing potions\n");
                }
                break;
              }
              case "Run": {
                console.log(
                  `\n\t ^_^ ${currentEnemy} gave you a run for your money ^_^\n`
                );
                enemyHealth = 0;
                break;
              }
            }
            if (enemyHealth <= 0 && battleResponse != "Run") {
              console.log(
                `\t --> You defeated ${currentEnemy}, mubarak ho,your score :${(scorePoints += 10)} <--\n`
              );
              let dropChance = getRandomNumber(0, 100);
              if (dropChance > potionDropChance) {
                console.log(`\t\tEnemy dropped a potion,potions +1\n`);
                healingPotions++;
              }
              break;
            }
            if (playerHealth <= 0) {
              console.log(`Your health is${playerHealth}, you lost\n`);
              break;
            }
          } while (battleResponse != "Run");
        }
      }
    } while (menueResponse != "Quit");
    console.log(`Your score, ${scorePoints}\n`);
  });
}
GAME();
