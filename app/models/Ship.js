const { Model } = require('objection');

class Shipping extends Model {
  static get tableName() {
    return 'shipping';
  }
}

module.exports = Shipping;
