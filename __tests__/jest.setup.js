var fs = require('fs');
var vm = require('vm');

var globalContext = vm.createContext(global);

const noModuleFiles = ['./src/js/noModuleB.js', './src/js/noModuleA.js'];
noModuleFiles.forEach(path => {
    const content = fs.readFileSync(path);
    vm.runInContext(content, globalContext);
});
