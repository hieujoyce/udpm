/* eslint no-console: 0 */
exports.getDomain = () => process.env.APP_DOMAIN;

exports.timeStart = (name) => {
  console.time(name);
};

exports.timeEnd = (name) => {
  console.timeEnd(name);
};

exports.log = (value) => {
  console.log(`${this.getCurrentAt()}:`, value);
};

exports.randomCode = () => {
  const randomstring = require('randomstring');

  const id = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  return id;
};
