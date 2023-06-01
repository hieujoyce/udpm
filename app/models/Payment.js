const { Model } = require('objection');

class Payment extends Model {
  static get tableName() {
    return 'payment';
  }
}

module.exports = Payment;
