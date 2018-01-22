exports.up = (knex, Promise) => {
  return knex.schema.createTable('jobs', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('name').notNullable();
    table.boolean('deleted');
    table.timestamps(true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('jobs');
};