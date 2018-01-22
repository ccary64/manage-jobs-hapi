exports.up = (knex, Promise) => {
  return knex.schema.createTable('jobs_status', (table) => {
    table.increments();
    table.integer('job_id').notNullable();
    table.string('last_task').notNullable();
    table.dateTime('start_time').notNullable();
    table.dateTime('end_time');
    table.string('status').notNullable();
    table.boolean('deleted').notNullable();
    table.timestamps(true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('jobs_status');
};