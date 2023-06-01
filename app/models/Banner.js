const { Model } = require('objection');

class Banner extends Model {
  static get tableName() {
    return 'banner';
  }
}

module.exports = Banner;
