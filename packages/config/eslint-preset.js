module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: ["**/node_modules", "**/dist", "**/build"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      rules: {
        // Disable React.FC missing in props validation error (react/prop-types)
        "react/prop-types": "off",
        "react/require-default-props": "off",
      },
    },
    {
      files: ["*.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-all-duplicated-branches": "off",
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "import/order": "off",
      },
    },
  ],
};
