import { users } from '../src/js/noModule';

// TODO: Find a way to load the noModule.js files which is no CommonJS/ES6
test.skip('static', () => {
    console.log(NoModule);
    expect(NoModule.STATIC_VAR).toBe(100);
});