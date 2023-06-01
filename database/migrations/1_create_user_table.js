exports.up = async (knex) => {
  const hasTable = await knex.schema.hasTable('users');
  if (hasTable) return;
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 127).collate('latin1_general_ci').notNullable();
    table.string('password', 256).collate('latin1_general_ci').notNullable();
    table.integer('role', 1).unsigned().notNullable();

    table.string('fullName', 50).collate('utf8_general_ci').nullable();
    table.string('phone', 20).nullable();
    table.string('address', 127).collate('utf8_general_ci').nullable();
    table.string('gender', 3).collate('utf8_general_ci').nullable();
    table.date('dateOfBirth').nullable();
    table.string('code', 256).nullable();
    table.timestamp('code_time').nullable();
    table.string('image', 120).collate('latin1_general_ci').nullable();

    table.string('refreshToken', 255).notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('email');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
