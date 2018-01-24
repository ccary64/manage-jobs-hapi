'use strict';

import * as jobActions from '../actions/jobs';

export default class worker {
  constructor(store) {
    this.store = store;
  }

  startJobsUpdate() {
    this.currentWorker = setInterval(() => this.store.dispatch(jobActions.fetchAll()), 1000);
  }
}