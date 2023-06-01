const { Model } = require('objection');

class Products extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    const Category = require('./Category');
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'products.categoryId',
          to: 'categories.id',
        },
      },
    };
  }
}

module.exports = Products;
