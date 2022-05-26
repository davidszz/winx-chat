/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const cracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  ],
};
