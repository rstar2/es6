module.exports = {
    "verbose": true,
    "moduleDirectories": [
        "src/js",
        "node_modules"
    ],
    "testPathIgnorePatterns": ["<rootDir>/e2e/"],
    "testMatch": ["**/?(*.)(spec|test).js"],
    "setupFiles": ["./jest.setup.js"]
}