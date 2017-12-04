import { ModuleB } from './moduleB';

const data = { a: 1, b: 2, c: 3 };
const clone = { ...data };

export const users = [10, 25, 45]
    .filter(age => age > 20)
    .map(age => new ModuleB(age));

 