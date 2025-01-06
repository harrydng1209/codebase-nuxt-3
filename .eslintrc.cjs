/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:perfectionist/recommended-natural-legacy'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    "eol-last": ["error", "always"],
    'no-console': [
      'warn',
      {
        allow: ['error', 'info']
      }
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: [],
        registeredComponentsOnly: false
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/prop-name-casing': ['error', 'camelCase']
  }
}
