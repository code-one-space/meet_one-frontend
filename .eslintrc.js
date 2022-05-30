module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react-native"
    ],
    "rules": {
        "no-duplicate-imports": 1,
        "react/react-in-jsx-scope": "off",
        "indent": ["error", 4],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }]
    }
}
