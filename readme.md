1. Babel
    - use the es2015 and stage-0 presets to get all ES6 features (even those not fully specified)
    - use 'transform-runtime' plugin so that generators and async/await could work

    - In order to be able to debug ES6 NodeJS in VSCode then use ('babel-register' package)
    and use it in _.vscode/launch.json_ :
    ```
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "sourceMaps": true,
                "program": "${file}",
                "stopOnEntry": false,
                "args": [],
                "cwd": "${workspaceRoot}",
                "preLaunchTask": null,
                "runtimeExecutable": null,
                "runtimeArgs": [
                    "--nolazy",
                    "--require",
                    "babel-register"
                ],
                "env": {
                    "NODE_ENV": "development"
                },
                "console": "internalConsole",
                "outFiles": []
            }
        ]
    }
    ```

    Also in _.babelrc_ we should have :
    ```
    {
        "presets": [
            "es2015"
        ],
        "sourceMaps": true,
        "retainLines": true
    }
    ```

    !!! Notice the _"sourceMaps": true_ property in both places
2. Webpack
 - Clean up the build folder (with 'clean-webpack-plugin')
 - Bundle the ES6 files as first they are compiled by Babel (with 'babel-loader')
 - Bundle and CSS/LESS and extract them to a single combined file
     (with 'extract-text-webpack-plugin')
 - Use template 'index.html' (with 'html-webpack-plugin')
 - Copy Images/Data files (with 'copy-webpack-plugin')

3. TypeScript
 - For better experience in VSCode it's good to have a _tsconfig.json_ :
 ```
 {
    "compilerOptions": {
        "target": "es6",
        "allowJs": true,
        "checkJs": true,
        "outDir": "out"
    },
    "include": [
        "src/js/**/*"
    ]
}
 ```

4. ES6 Testing with Jest
 - It done automatically as it uses internally ('babel-jest').
    All that is needed it is to have in _.babel.rc_ (on ROOT level) a preset for "2015"
    it can use the default one if it's the same or set one for 'test' environment:
    ```
    {
        "presets": [ ...],
        "env": {
            "test": {
                "presets": ["es2015"]
            }
        }
    }
    ```
- For VSCode autocompletion/intellisense install '@types/jest'
```
$ npm install -D @types/jest
```
- For debugging in VSCode add in _launch.json_ :
```
        {
            "type": "node",
            "request": "launch",
            "name": "Jest",
            "cwd": "${workspaceRoot}",
            "sourceMaps": true,
            "program": "${workspaceRoot}/node_modules/jest/bin/jest",
            "args": [
                "-i"
            ],
            "console": "internalConsole",
            "internalConsoleOptions": "openOnSessionStart",
            "outFiles": []
        }
```


    