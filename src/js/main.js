import { users } from "./moduleA";
import "./moduleGenerator";

users.forEach(element => {
    console.log(element.age);
});