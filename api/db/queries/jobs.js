const knex = require('../connection');

function getAllByUserId(id) {
  return knex('jobs')
  .select('*')
  .where({ user_id: parseInt(id, /* radix */ 10), deleted: false })
  .innerJoin('jobs_status', 'jobs.id', 'jobs_status.job_id')
}

function getAllCurrentByUserId(id) {
  return knex('jobs')
  .distinct(knex.raw(`ON (jobs_status.job_id) "jobs_status"."job_id" as "jobId",
  "jobs_status"."id" as "statusId", "jobs_status"."status" as "status", "name",
  "jobs_status"."last_task" as "lastTask", "jobs_status"."start_time" as "startTime",
  "jobs_status"."end_time" as "endTime"`))
  .where({ user_id: parseInt(id, /* radix */ 10), 'jobs.deleted': false })
  .innerJoin('jobs_status', 'jobs.id', 'jobs_status.job_id')
  .orderBy('jobs_status.job_id', 'desc')
  .orderBy('jobs_status.id', 'desc');
}

function getCurrentById(jobId) {
  return knex('jobs')
  .distinct(knex.raw(`ON (jobs_status.job_id) "jobs_status"."job_id" as "jobId",
    "jobs_status"."id" as "statusId", "jobs_status"."status" as "status", "name",
    "jobs_status"."last_task" as "lastTask", "jobs_status"."start_time" as "startTime",
    "jobs_status"."end_time" as "endTime"`))
    .where({ 'jobs.id': parseInt(jobId, /* radix */ 10) })
    .innerJoin('jobs_status', 'jobs.id', 'jobs_status.job_id')
    .orderBy('jobs_status.job_id', 'desc')
    .orderBy('jobs_status.id', 'desc');
}

function getAllByStatusType(statusType) {
  return knex('jobs_status')
  .select({ id: 'id', jobId: 'job_id', lastTask: 'last_task', startTime: 'start_time', endTime: 'end_time', status: 'status' })
  .where({ status: statusType, deleted: false });
}

function getAllById(jobId) {
  return knex('jobs_status')
  .select({ statusId: 'id', lastTask: 'last_task', startTime: 'start_time', endTime: 'end_time', status: 'status' })
  .where({ 'job_id': parseInt(jobId, /* radix */ 10) });
}

function create(job) {
  const { userId, name } = job;
  return knex('jobs')
  .insert({'user_id': userId, deleted: false, name })
  .returning('*');
}

function createStatus(jobStatus) {
  const { jobId, startTime, status = 'running' , lastTask = 'starting' } = jobStatus;
  return knex('jobs_status')
  .insert({'job_id': jobId, 'start_time': startTime, 'last_task': lastTask, deleted: false,  status })
  .returning('*');
}

function batchEndJobs(jobIds, currentTime) {
  return knex('jobs_status')
    .whereIn('job_id', jobIds)
    .update({'end_time': currentTime, status: 'complete', 'last_task': 'finnished' });
}

function updateJob(id, job) {
  return knex('jobs')
  .update(job)
  .where({ id: parseInt(id, /* radix */ 10) })
  .returning('*');
}

function remove(jobId) {
  return knex('jobs')
  .update({ deleted: true })
  .where({ id: parseInt(jobId, /* radix */ 10) });
}

module.exports = {
  getAllByUserId,
  getAllCurrentByUserId,
  getCurrentById,
  getAllByStatusType,
  getAllById,
  create,
  createStatus,
  batchEndJobs,
  updateJob,
  remove
};