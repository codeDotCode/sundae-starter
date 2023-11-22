const vitest = require("eslint-plugin-vitest");

module.exports = {
  globals: {
    ...vitest.environments.env.globals,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:testing-library/react",
    "plugin:vitest/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "warn",
    "vitest/expect-expect": "off",
    "react/prop-types": "off",
  },
};
