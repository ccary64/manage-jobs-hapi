'use strict';

import {
  FETCH_JOBS,
  FETCH_JOB_BY_ID,
  CREATE_JOB,
  REMOVE_JOB,
  RERUN_JOB,
  SET_SELECTED_JOBS,
  LOCK_QUEUE
} from './actionTypes';

const POST_PARAMS = {
  method: 'POST', 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

const DELETE_PARAMS = {
  method: 'DELETE'
}

export const fetchById = (jobId) => {
  return {
    types: FETCH_JOB_BY_ID,
    api: { url: `/jobs/${jobId}` }
  }
};

export const fetchAll = () => {
  return {
    types: FETCH_JOBS,
    api: { url: '/jobs' }
  }
};

export const create = (job) => {
  const params = Object.assign(POST_PARAMS, { body: JSON.stringify(job) })

  return {
    types: CREATE_JOB,
    api: { url: '/jobs', params }
  }
}

export const setSelected = (selected) => {
  return {
    type: SET_SELECTED_JOBS,
    payload: { selected }
  }
}


export const remove = (jobId) => {
  return {
    types: REMOVE_JOB,
    api: { url: `/jobs/${jobId}`, params: DELETE_PARAMS }
  }
}

export const rerun = (jobId) => {
  return {
    types: RERUN_JOB,
    api: { url: `/jobs/${jobId}/rerun` }
  }
}

export const lockQueue = (locked) => {
  const params = Object.assign(POST_PARAMS, { body: JSON.stringify(locked) })

  return {
    types: LOCK_QUEUE,
    api: { url: '/jobs/lock', params }
  }
}

