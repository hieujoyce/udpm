exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('cart');
  if (hasTable) return;
  await knex.schema.createTable('cart', (table) => {
    table.increments('id').primary();
    table.integer('quantity').notNullable();
    table.integer('subTotal').notNullable();
    table.string('productColor').collate('utf8_general_ci');
    table.string('productSize').collate('utf8_general_ci');
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.integer('userId').unsigned().references('users.id').notNullable();
    table
      .integer('productId')
      .unsigned()
      .references('products.id')
      .notNullable();

    table.index('userId');
    table.index('productId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('cart');
};
