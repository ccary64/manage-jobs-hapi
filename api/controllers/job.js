'use strict';

const jobQueries = require('../db/queries/jobs');

/**
 * List jobs
 */
exports.list = async (req, h) => {
  const jobs = await jobQueries.getAllCurrentByUserId(1);
  
  return { status: true, jobs, locked: global.queueLock || false };
}
/**
 * Get Job by ID
 */
exports.getByID = async (req, h) => {
  const { jobId } = req.params;
  try {
    const details = await jobQueries.getAllById(jobId);
    return { status: true, jobId, details };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
}


/**
 * POST a Job
 */
exports.create = async (req, h) => {
  const { name } = req.payload;
  const interstingJob = { name, userId: 1 };
  try {
    const [createdJob] = await jobQueries.create(interstingJob);

    const jobStatus = { jobId: createdJob.id, startTime: new Date() };

    await jobQueries.createStatus(jobStatus);
    
    const [job] = await jobQueries.getCurrentById(createdJob.id);
    return { status: true, job };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
}

exports.lock = async (req, h) => {
  const { locked } = req.payload;
  global.queueLock = locked;
  return { status: true, locked };
}

/**
 * PUT | Update Dog by ID
 */
exports.update = async (req, h) => {
  const { jobId } = req.payload;
  try {
    const currentTime = new Date();
    const jobStatus = { jobId, startTime: currentTime };
    const details = await jobQueries.getById(jobId);
    await jobQueries.batchEndJobs([jobId], currentTime);
    await jobQueries.createStatus(jobStatus);
    return { status: true, jobId };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
}


exports.remove = async (req, h) => {
  const { jobId } = req.params;
  await jobQueries.remove(jobId);
  return { status: true, jobId };
}