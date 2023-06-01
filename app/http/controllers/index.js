/* eslint global-require:0, import/no-dynamic-require: 0 */
const fs = require('fs');
const path = require('path');

const { handleError } = require('../../helpers/error');

const controllers = {};

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((dir) => {
    controllers[dir] = {};
    fs.readdirSync(path.join(__dirname, dir))
      .forEach((file) => {
        const controller = require(path.join(__dirname, dir, file));
        const name = path.basename(file, '.js');
        controllers[dir][name] = handleError(controller);
      });
  });

module.exports = controllers;
