#! /usr/bin/env node
import inquirer from 'inquirer';

let getRandomNumber=(minimum:number,maximum:number):number=>{
    let temp:number=0;
    temp=Math.floor(Math.random()*(maximum-minimum))+minimum
    return temp;
}

async function GAME() {

    interface QuestionInterface{
        name:string,
        type:any,
        choices?:string[],
        default?:string
    }

    let menueResponse:string;
    const nameQuestion:QuestionInterface={name:"nameInput",type:'input'};
    const menueQuestion:QuestionInterface={name:'menueInput',type:'list',choices:['Play','Quit']};
    const battleQuestion:QuestionInterface={name:'battleInput',type:'list',choices:['Attack','Defend','Heal','Run']};
    let Questions:QuestionInterface[]=[nameQuestion,menueQuestion,battleQuestion]

    const enemyMaxAttack:number=25;let enemyAttack:number;
    const enemyMaxHealth:number=75;let enemyHealth:number;

    const playerMaxAttack=50;let playerHealth:number;
    const playerMaxHealth=100;let scorePoints=0;
    let healingPotions:number=3;const healingPotionEffect=30;
    let potionDropChance:number=50;

    const enemyList:string[]=['Nawaz Sharif','Shahbaz Sharif','Bajwa','Bilawal'];
    let playerName:string;let currentEnemy:string;

    playerName=String((await inquirer.prompt(Questions[0])).nameInput);
    console.log(playerName);
    do{
        menueResponse=String((await inquirer.prompt(Questions[1])).menueInput);
        if(menueResponse==='Play'){
            let firstRun:boolean=true;
            let  battleResponse:string;
            currentEnemy=enemyList[getRandomNumber(0,4)];playerHealth=playerMaxHealth;
            enemyHealth=getRandomNumber(0,enemyMaxHealth);enemyAttack=getRandomNumber(0,enemyMaxAttack);
            console.log(`\n--------------------------------------------------------------------\n`);
            console.log(`\t\t # ${currentEnemy} has appeared #\n`);
            console.log(`\t\t Attack : ${enemyAttack}, Health : ${enemyHealth} \n`);
            
            while(enemyHealth>0 && playerHealth>0){
                do{
                    battleResponse=String((await inquirer.prompt(Questions[2])).battleInput);
                        firstRun=false;
                        switch(battleResponse){
                            case 'Attack':{
                                let playerAttack=getRandomNumber(0,playerMaxAttack);
                                enemyHealth-=playerAttack;
                                playerHealth-=enemyAttack;
                                console.log(`\nYou did ${playerAttack} damage, enemy health : ${enemyHealth}\n`);
                                console.log(`Enemy did ${enemyAttack} damage, your health : ${playerHealth}\n`);
                                break;
                            }
                            case 'Defend':{
                                let nerfedEnemyAttack=getRandomNumber(0,enemyAttack);
                                playerHealth-=nerfedEnemyAttack;
                                if(nerfedEnemyAttack===0){
                                    console.log("Enemy attack nullified\n");
                                }else if(nerfedEnemyAttack<enemyAttack){
                                    console.log(`\nEnemy attack, reduced by : ${enemyAttack-nerfedEnemyAttack}\n`);
                                    console.log(`Your received, ${nerfedEnemyAttack} damaged, Health : ${playerHealth}\n`)
                                }else{
                                    console.log("Defense failed\n")
                                }
                                break;
                            }
                            case 'Heal':{
                                if(healingPotions>0){
                                    if(playerHealth>70){playerHealth=100;}else{playerHealth+=healingPotionEffect;}
                                    healingPotions--;
                                    console.log(`Healing potion used,health +${healingPotionEffect}, remaining:${healingPotions}\n`);
                                }else{
                                    console.log("No healing potions\n");
                                }
                                break;
                            }
                            case 'Run':{
                                console.log(`\n\t ^_^ ${currentEnemy} gave you a run for your money ^_^\n`);
                                enemyHealth=0;
                                break;
                            }
                        }
                        if(enemyHealth<=0 && battleResponse !='Run'){
                            console.log(`\t --> You defeated ${currentEnemy}, mubarak ho,your score :${scorePoints+=10} <--\n`);
                            let dropChance=getRandomNumber(0,100);
                            if(dropChance>potionDropChance){
                                console.log(`\t\tEnemy dropped a potion,potions +1\n`);
                                healingPotions++;
                            }
                            break;
                        }
                        if(playerHealth<=0 ){
                            console.log(`Your health is${playerHealth}, you lost\n`);
                            break;
                        }
                                
                }while(battleResponse!='Run');
            }
            
        }
    }while(menueResponse!='Quit')
    console.log(`Your score, ${scorePoints}\n`);
}

GAME();