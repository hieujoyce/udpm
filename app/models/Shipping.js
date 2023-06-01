const { Model } = require('objection');

class Shipping extends Model {
  static get tableName() {
    return 'shipping';
  }

  static get relationMappings() {
    const User = require('./User');
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'shipping.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Shipping;
