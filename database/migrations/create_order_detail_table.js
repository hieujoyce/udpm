exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable('order_detail');
  if (hasTable) return;
  await knex.schema.createTable('order_detail', (table) => {
    table.increments('id').primary();
    table.integer('price').unsigned().notNullable();
    table.integer('quantity').unsigned().notNullable();
    table.string('productColor', 50).collate('utf8_general_ci').notNullable();
    table.string('productSize', 50).collate('utf8_general_ci').notNullable();
    table.integer('orderId').unsigned().references('orders.id').notNullable();
    table
      .integer('productId')
      .unsigned()
      .references('products.id')
      .notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.index('orderId');
    table.index('productId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('order_detail');
};
