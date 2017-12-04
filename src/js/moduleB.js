export class ModuleB {
    constructor(age) {
        this._age = age;
    }

    get age() {
        return this._age;
    }
}