import { stat } from "fs";
import { BankInterface } from "./BankInterface.js";

class Bank implements BankInterface{
    public AccountBalance:number=0;
    //Methods
    constructor() {
        this.AccountBalance=100;
    }

    set setBalance(amount:number){
        this.AccountBalance=amount;
    }
    get getBalance():number{
        return this.AccountBalance;
    }

    Debit(d: number): string {
        let statement:string='Sorry, you have insufficient funds\n';
        if(d>0){

            if(d>this.AccountBalance){
                console.log(statement);
            }else{
                this.AccountBalance-=d;
                statement=`Transaction Successful!,new balance is : ${this.getBalance}`
            }

        }else{
            statement="Please enter correct amount"
        }
        return statement;
    }
    Credit(c: number): string {
        let statement:string='Insufficient Amount';
        if(c>0){
            this.AccountBalance+=c;
            if(c>100){
                this.AccountBalance-=1;
            }
            statement=`Transaction Successful, new balance ${this.AccountBalance}\n`
        }
        return statement;
    }
    
}

export {Bank}