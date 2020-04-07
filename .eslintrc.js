module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-mixed-spaces-and-tabs": [2, "smart-tabs"]
    }
};