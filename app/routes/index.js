/* eslint global-require:0, import/no-dynamic-require: 0 */
const fs = require('fs');
const path = require('path');

const routes = {};
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    const name = path.basename(file, '.js');
    routes[name] = route;
  });

module.exports = routes;
