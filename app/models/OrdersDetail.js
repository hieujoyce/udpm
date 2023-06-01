const { Model } = require('objection');

class OrdersDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }

  static get relationMappings() {
    const Product = require('./Products');
    const Order = require('./Orders');

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'order_detail.productId',
          to: 'products.id',
        },
      },
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_detail.orderId',
          to: 'orders.id',
        },
      },
    };
  }
}

module.exports = OrdersDetail;
