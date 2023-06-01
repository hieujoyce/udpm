exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('advertisements');
  if (hasTable) return;
  await knex.schema.createTable('advertisements', (table) => {
    table.increments('id').primary();
    table.string('content', 100).collate('utf8_general_ci').notNullable();
    table.string('image', 120).collate('latin1_general_ci').notNullable();

    table
      .integer('productId')
      .unsigned()
      .references('products.id')
      .notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('productId');

    table.index('productId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('advertisements');
};
