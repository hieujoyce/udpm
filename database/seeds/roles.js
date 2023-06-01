exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('roles').del();
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Employee' },
  ];

  await knex('roles').insert(roles);
};
