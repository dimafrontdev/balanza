const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { settings: { 'import/core-modules': ['@env'] } },
  { ignores: ['dist/*'] },
]);
