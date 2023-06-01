const { Model } = require('objection');

class Cart extends Model {
  static get tableName() {
    return 'cart';
  }
}

module.exports = Cart;
