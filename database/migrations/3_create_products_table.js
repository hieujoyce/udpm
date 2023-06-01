exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable('products');
  if (hasTable) return;
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('productName', 250).collate('utf8_general_ci').notNullable();
    table.string('productSlug', 250).collate('utf8_general_ci').notNullable();
    table.text('productImg').notNullable();
    table.string('productCode', 50).notNullable();
    table.string('productSize', 50).notNullable();
    table.string('productColor', 50).notNullable();
    table.integer('sellingPrice').unsigned().notNullable();
    table.integer('discountPrice').unsigned().notNullable();
    table
      .string('product3DModelPath')
      .collate('latin1_general_ci')
      .notNullable();
    table.text('productDescription').collate('utf8_general_ci').notNullable();
    table.string('productThumbnail').notNullable();

    table
      .integer('categoryId')
      .unsigned()
      .references('categories.id')
      .notNullable();

    table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updatedAt')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('productName');
    table.index('categoryId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
};
