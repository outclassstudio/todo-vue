module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
