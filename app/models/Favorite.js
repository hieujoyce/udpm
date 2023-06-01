const { Model } = require('objection');

class Favorite extends Model {
  static get tableName() {
    return 'favorites';
  }

  static get relationMappings() {
    const User = require('./User');
    const Products = require('./Products');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorites.userId',
          to: 'users.id',
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'favorites.productId',
          to: 'products.id',
        },
      },
    };
  }
}

module.exports = Favorite;
