const fs = require('fs');
const vm = require('vm');

const globalEx = Object.assign({}, global);
const globalExContext = vm.createContext(globalEx);

const noModuleFiles = ['./src/js/noModuleB.js', './src/js/noModuleA.js'];
noModuleFiles.forEach(path => {
    const content = fs.readFileSync(path);
    vm.runInContext(content, globalExContext, { filename: path });
});

Object.assign(global, globalEx);
