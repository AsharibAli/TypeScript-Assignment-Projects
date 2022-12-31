#!/usr/bin/env node
import prompt, { message } from 'prompt'

async function StopWatchFunction() {
    let inputHours=0;let inputMinutes=0;let inputSeconds=0;
    let inputInSeconds:number;
    inputHours =Number(( await prompt.get([{
        name:'Hours',
        type:'number',
        pattern:/^d+$/,
        message:'Must be number',
        conform:(value)=>{
            if(isNaN(value)){
                return false;
            }
            return true;
        }
    }])).Hours);
     inputMinutes =Number(( await prompt.get([{
        name:'Minutes',
        type:'number',
        pattern:/^d+$/,
        message:'Must be number',
        conform:(value)=>{
            if(isNaN(value)){
                return false;
            }
            return true;
        }
    }])).Minutes)
     inputSeconds =Number(( await prompt.get([{
        name:'Seconds',
        type:'number',
        pattern:/^d+$/,
        message:'Must be number',
        conform:(value)=>{
            if(isNaN(value)){
                return false;
            }
            return true;
        }
    }])).Seconds)
    console.log(inputHours,inputMinutes,inputSeconds);

    inputInSeconds=(inputHours*60*60)+(inputMinutes*60)+(inputSeconds);
    const dateObject=new Date;
    const startingTimeInSeconds=Math.floor(dateObject.getTime()/1000);
    let countingSeconds=Math.round(dateObject.getTime()/1000);const endPoint=startingTimeInSeconds+inputInSeconds;

    let stopWatchInterval=setInterval(()=>{
        
        //console.log(countingSeconds)
        if(inputSeconds<0 && inputMinutes>0){
            inputMinutes--;
            inputSeconds=59;
        }else if(inputMinutes<=0 && inputHours>0){
            inputHours--;
            inputMinutes=59;
        }
        if(inputSeconds<0){
            console.log(`\t\n --- Timer Ended --- \n`);
            clearInterval(stopWatchInterval);
        }
        if(inputHours>0 || inputMinutes>0 || inputSeconds>=0){
            console.log(`Hours:${inputHours} Minutes:${inputMinutes} Seconds:${inputSeconds}`);
            countingSeconds++;
            inputSeconds--;
        }
        if(countingSeconds>endPoint){
            console.log(`\t\n --- Timer Ended --- \n`);
            clearInterval(stopWatchInterval);
        }
    },1000);
    
}

StopWatchFunction();