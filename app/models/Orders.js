const { Model } = require('objection');

class Orders extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    const ShippingDetail = require('./ShippingDetail');
    const User = require('./User');

    return {
      shipping: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShippingDetail,
        join: {
          from: 'orders.shippingId',
          to: 'shipping_detail.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Orders;
