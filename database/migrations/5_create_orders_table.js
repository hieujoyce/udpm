exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('orders');
  if (hasTable) return;
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('status', 50).collate('utf8_general_ci').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table
      .integer('shippingId')
      .unsigned()
      .references('shipping_detail.id')
      .notNullable();
    table.integer('userId', 10).unsigned().notNullable();
    table.index('shippingId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('orders');
};
