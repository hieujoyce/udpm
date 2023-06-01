exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable('roles');
  if (hasTable) return;
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name', 127).collate('latin1_general_ci').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
