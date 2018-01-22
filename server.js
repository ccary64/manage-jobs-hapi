'use strict';

const Hapi = require('hapi');
const Api = require('./api');
const FrontEnd = require('./front_end');
const Router = require('./shared/baseRouter');
const config = require('./config');
const workers = require('./workers');

const JobChecker = workers.JobChecker;

const server = Hapi.server(config.development);

(async () => {
  try {
    const router = new Router(server);
    const api = new Api(router);
    const frontEnd = new FrontEnd(router);    
    const jobChecker = new JobChecker();

    await router.plugins();
    
    api.registerRoutes();
    await frontEnd.registerRoutes();

    jobChecker.start();

    if (process.env.NODE_ENV === 'test') {
      return;
    }
    
    server.start();
    console.log('Server started on port', config.development.port);
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
})();

module.exports = server;