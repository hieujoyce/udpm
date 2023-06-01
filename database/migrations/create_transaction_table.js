exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('transaction');
  if (hasTable) return;
  await knex.schema.createTable('transaction', (table) => {
    table.increments('id').primary();
    table
      .string('transactionType', 50)
      .collate('utf8_general_ci')
      .notNullable();
    table.string('description', 255).collate('utf8_general_ci').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.integer('user_id').unsigned().references('users.id').notNullable();

    table.index('user_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('transaction');
};
