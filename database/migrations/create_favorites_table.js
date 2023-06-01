exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('favorites');
  if (hasTable) return;
  await knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table
      .integer('productId')
      .unsigned()
      .references('products.id')
      .notNullable();
    table.integer('userId').unsigned().references('users.id').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('shipping_detail');
};
