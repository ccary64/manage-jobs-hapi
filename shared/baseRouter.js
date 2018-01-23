
'use strict';

const Inert = require('inert');

class BaseRouter {
  constructor(server) {
    this.server = server;
  }

  get verbs() {
    return {
      GET: 'GET',
      PUT: 'PUT',
      POST: 'POST',
      DELETE: 'DELETE',
      ALL: '*'
    }
  }

  get paths() {
    return {
      baseApi: '/api',
      jobs: '/api/jobs',
      jobById: '/api/jobs/{jobId}',
      jobByIdRerun: '/api/jobs/{jobId}/rerun',
      jobsLock: '/api/jobs/lock',
      baseStatic: '/public/{path*}',
      public: '/public',
      base: '/',
      catchAll: '/{p*}'
    }
  }

  async plugins() {
    await this.server.register(Inert);
  }

  get(path, handler) {
    this.server.route({ method: this.verbs.GET, path, handler });
  }

  post(path, handler) {
    this.server.route({ method: this.verbs.POST, path, handler });
  }

  put(path, handler) {
    this.server.route({ method: this.verbs.PUT, path, handler });
  }

  delete(path, handler) {
    this.server.route({ method: this.verbs.DELETE, path, handler });
  }

  all(path, handler) {
    this.server.route({ method: this.verbs.ALL, path, handler });
  }
}

module.exports = BaseRouter;