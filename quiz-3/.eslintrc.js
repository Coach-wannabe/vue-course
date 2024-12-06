module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    extends: [
      'plugin:vue/vue3-essential',
      'plugin:@typescript-eslint/recommended',
      'eslint:recommended',
      'prettier',  // Ensure this line is included to integrate Prettier with ESLint
    ],
    rules: {
      'vue/multi-word-component-names': 'off', // Customize rules as needed
    },
  };
  