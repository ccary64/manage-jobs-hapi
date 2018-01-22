'use strict';

const jobQueries = require('../api/db/queries/jobs');
const moment = require('moment');

const MAX_TIME = 15;

module.exports = class JobChecker {
  // Delay this worker so the db can seed everything
  start() {
    setTimeout(this.setLoop.bind(this), 10000);
  }

  // Poll the DB and set jobs
  setLoop() {
    setInterval(async () => {
      const jobs = await jobQueries.getAllByStatusType('running') || [];
      const currentTime = new Date();
      const luckyNumber = Math.floor(Math.random() * MAX_TIME) + 1;

      const endingJobs = jobs.filter(item => {
        const elapsedTime = moment(currentTime).diff(item.startTime, 'seconds');
        if (elapsedTime > MAX_TIME || elapsedTime === luckyNumber) {
          return true;
        }
      });

      if (!endingJobs.length) {
        return;
      }
      
      const jobIds = endingJobs.map(item => item.jobId);
      await jobQueries.batchEndJobs(jobIds, currentTime);
    }, 1000);
  }
}