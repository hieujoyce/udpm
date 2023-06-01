const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const views = {};

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((dir) => {
    views[dir] = {};
    fs.readdirSync(path.join(__dirname, dir))
      .forEach((file) => {
        const tpl = fs.readFileSync(path.join(__dirname, dir, file), 'utf8');
        const name = path.basename(file, '.tpl');
        views[dir][name] = handlebars.compile(tpl);
      });
  });

module.exports = views;
