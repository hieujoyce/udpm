exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable('categories');
  if (hasTable) return;
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('categoryName', 50).collate('utf8_general_ci').notNullable();
    table.string('categoryIcon', 255).notNullable();
    table.string('categorySlug', 255).notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('categoryName');

    table.index('categoryName');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('categories');
};
