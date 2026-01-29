import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/allure-report/**',
      '**/allure-results/**',
      '**/Booking-API/**',
    ],
  },

  js.configs.recommended,

  /*********************
  1) CommonJS: WDIO config files
  **********************/
  {
    files: ['src/config/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.node,
        browser: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  /****************************
  2) ESM: Page Objects + Step Definitions
  *****************************/
  {
    files: ['src/pom/**/*.js', 'src/tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'require-await': 'warn',
      'no-var': 'error',
    },
  },
]);
