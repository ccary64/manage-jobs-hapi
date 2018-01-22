'use strict';

const Path = require('path');

module.exports = class FrontEnd {
  constructor(router) {
    this.router = router;
  }

  async registerRoutes() {
    this.router.get(this.router.paths.baseStatic, this.staticDirectory);
    this.router.get(this.router.paths.catchAll, this._indexPage);
    this.router.all(this.router.paths.catchAll, this._404Reponse);
  }

  _indexPage(request, h) {
    return h.file('index.html')
  }

  _404Reponse(request, h) {
    throw new Error('bad request');
  }

  get staticDirectory() {
    return {
      directory: {
        path: Path.join(__dirname, 'public'),
        redirectToSlash: false,
        index: false
      }
    }
  }
}