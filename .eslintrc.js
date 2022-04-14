module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 'prettier/@typescript-eslint',
    'prettier',
    'plugin:react/recommended',
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // Make sure this line is the last element
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    // JavaScript
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // allow calling functions and classes before definition to hoist the most important definition
    '@typescript-eslint/no-use-before-define': [
      'error',
      {functions: false, classes: false, variables: false},
    ],
    // allow using type "any"
    '@typescript-eslint/no-explicit-any': 'off',
    // allow defining function with no explicit return type as it can be inferred
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/display-name': 'off',

    // allow use require()
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'variable', format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE']},
      {selector: 'function', format: ['camelCase', 'PascalCase', 'UPPER_CASE']},
      {selector: 'typeLike', format: ['camelCase', 'PascalCase']},
    ],
  },
};
