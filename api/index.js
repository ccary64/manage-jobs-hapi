
const controllers = require('./controllers');

module.exports = class Api {
  constructor(router) {
    this.router = router;
  }

  registerRoutes() {
    this.router.get(this.router.paths.jobs, controllers.Job.list);
    this.router.post(this.router.paths.jobs, controllers.Job.create);
    this.router.get(this.router.paths.jobById, controllers.Job.getByID);
    this.router.get(this.router.paths.jobByIdRerun, controllers.Job.rerun);
    this.router.post(this.router.paths.jobsLock, controllers.Job.lock);
    this.router.delete(this.router.paths.jobById, controllers.Job.remove);
  }
}