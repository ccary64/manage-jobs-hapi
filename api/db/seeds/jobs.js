'use strict';

exports.seed = async (knex) => {
  await knex('jobs').del();
  await knex('jobs_status').del();
  
  const job1 = {
    user_id: 1,
    name: 'My first job',
    deleted: false,
  };

  const job2 = {
    user_id: 1,
    name: 'My second job',
    deleted: false,
  };
  
  const createdJob1 = await knex('jobs').insert(job1).returning('*');
  const createdJob2 = await knex('jobs').insert(job2).returning('*');

  const jobStatus1 = {
    job_id: createdJob1[0].id,
    last_task: 'finished',
    start_time: new Date(),
    end_time: new Date(),
    status: 'complete',
    deleted: false,
  };

  const jobStatus2 = {
    job_id: createdJob1[0].id,
    last_task: 'starting',
    start_time: new Date(),
    end_time: null,
    status: 'running',
    deleted: false,
  };

  const jobStatus3 = {
    job_id: createdJob2[0].id,
    last_task: 'starting',
    start_time: new Date(),
    end_time: null,
    status: 'running',
    deleted: false,
  };

  await knex('jobs_status').insert(jobStatus1);
  await knex('jobs_status').insert(jobStatus2);
  await knex('jobs_status').insert(jobStatus3);

};