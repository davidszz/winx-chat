/* eslint-disable import/no-extraneous-dependencies */
const { alias, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = alias(aliasMap);
