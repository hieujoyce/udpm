const { Model } = require('objection');

class ShippingDetail extends Model {
  static get tableName() {
    return 'shipping_detail';
  }
}

module.exports = ShippingDetail;
