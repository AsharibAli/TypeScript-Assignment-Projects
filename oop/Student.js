import { Person } from "./Person.js";
class Student extends Person {
    _name = '';
    Student() {
        this._name = "";
    }
    get getName() {
        return this._name;
    }
    set setName(v) {
        this._name = v;
    }
}
export { Student };
