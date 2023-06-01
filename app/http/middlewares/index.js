/* eslint global-require:0, import/no-dynamic-require: 0 */
const fs = require('fs');
const path = require('path');

const middlewares = {};
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const middleware = require(path.join(__dirname, file));
    const name = path.basename(file, '.js');
    middlewares[name] = middleware;
  });

module.exports = middlewares;
