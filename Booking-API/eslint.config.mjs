import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['**/mochawesome-report/**', '**/nodule_modules/**'],
  },

  js.configs.recommended,

  /****************************
  Booking-API project
  ****************************/
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
    },
  },
]);
