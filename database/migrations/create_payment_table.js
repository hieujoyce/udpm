exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('payment');
  if (hasTable) return;
  await knex.schema.createTable('payment', (table) => {
    table.increments('id').primary();
    table.string('paymentMethod').notNullable();
    table.string('paymentMethodTitle').notNullable();
    table.string('paymentDescription').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('payment');
};
