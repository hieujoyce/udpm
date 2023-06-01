const { Model } = require('objection');

class Category extends Model {
  static get tableName() {
    return 'categories';
  }
}

module.exports = Category;
