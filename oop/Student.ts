import { Person } from "./Person.js";

class Student extends Person{
    private _name:string='';

    public Student(){
        this._name=""
    }       
    public get getName() : string {
        return this._name
    }
     public set setName(v : string) {
        this._name = v;
    }   
}

export {Student};