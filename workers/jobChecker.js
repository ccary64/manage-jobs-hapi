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
      const unluckyNumber = Math.floor(Math.random() * MAX_TIME) + 1;

      const taskedJobs = jobs.map(async item => {
        const elapsedTime = moment(currentTime).diff(item.startTime, 'seconds');
        if (elapsedTime === unluckyNumber) {
          return jobQueries.updateBuildStatus(item.id, 'error');
        }
        return jobQueries.updateTask(item.id, `random task ${elapsedTime}`);
      });

      const endingBuildIds = jobs.filter(item => {
        const elapsedTime = moment(currentTime).diff(item.startTime, 'seconds');
        return (elapsedTime > MAX_TIME || elapsedTime === luckyNumber);
      }).map(item => item.id);

      const queryPromises = (endingBuildIds.length) ? [...taskedJobs, jobQueries.batchEndJobs(endingBuildIds, currentTime)] : taskedJobs;
      
      await Promise.all(queryPromises);
    }, 1000);
  }
}