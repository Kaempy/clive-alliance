// const { defineConfig } = require('eslint/config');
// const expoConfig = require('eslint-config-expo/flat');
// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
// const testingLibraryConfig = require('eslint-plugin-testing-library/configs/flat/react');

// module.exports = defineConfig([
//   expoConfig,
//   eslintPluginPrettierRecommended,
//   ...testingLibraryConfig,
//   {
//     ignores: ['dist/*', '/.expo', 'node_modules'],
//   },
// ]);
// .eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const testingLibrary = require('eslint-plugin-testing-library');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      // React Native: disable DOM import rule in base config
      'testing-library/no-dom-import': 'off',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      // React Native specific adjustments
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/prefer-user-event': 'error',
      'testing-library/no-node-access': 'error',
      'testing-library/no-container': 'error',
      'testing-library/no-debugging-utils': 'warn',
      // Disable DOM-specific rules
      'testing-library/no-dom-import': 'off',
      'testing-library/render-result-naming-convention': 'off',
    },
  },
  {
    files: ['jest.setup.js', 'jest.config.js', '**/__mocks__/**/*'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  {
    ignores: ['dist/*', '/.expo', 'node_modules'],
  },
]);
