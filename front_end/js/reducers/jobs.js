'use strict';

import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_BY_ID_REQUEST,
  FETCH_JOB_BY_ID_SUCCESS,
  FETCH_JOB_BY_ID_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  REMOVE_JOB_REQUEST,
  REMOVE_JOB_SUCCESS,
  REMOVE_JOB_FAILURE,
  RERUN_JOB_REQUEST,
  RERUN_JOB_SUCCESS,
  RERUN_JOB_FAILURE,
  LOCK_QUEUE_REQUEST,
  LOCK_QUEUE_SUCCESS,
  LOCK_QUEUE_FAILURE,
  SET_SELECTED_JOBS,
  SET_UPDATER
} from '../actions/actionTypes';

export default (state = {}, action = {}) => {
  const { payload = {}, type } = action;
  const { list = [] } = state;
  const getJobById = (jobId) => list.filter(item => item.jobId === jobId);

  switch (type) {
    case FETCH_JOBS_REQUEST:
    case CREATE_JOB_REQUEST:
    case LOCK_QUEUE_REQUEST:
    case REMOVE_JOB_REQUEST:
    case RERUN_JOB_REQUEST:
    case FETCH_JOB_BY_ID_REQUEST:
      return {
        ...state,
        fetching: type
      };
    case REMOVE_JOB_FAILURE:
    case FETCH_JOBS_FAILURE:
    case FETCH_JOB_BY_ID_FAILURE:
    case CREATE_JOB_FAILURE:
    case LOCK_QUEUE_FAILURE:
    case REMOVE_JOB_FAILURE:
    case RERUN_JOB_FAILURE:
    case REMOVE_JOB_SUCCESS:
    case RERUN_JOB_SUCCESS:
    case CREATE_JOB_SUCCESS:
    case LOCK_QUEUE_SUCCESS:
      return {
        ...state,
        fetching: false
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        list: payload.jobs || [],
        locked: payload.locked || false,
        fetching: false
      };
    case FETCH_JOB_BY_ID_SUCCESS:
      const [currentJob] = getJobById(parseInt(payload.jobId, /* radix */ 10));
      return {
        ...state,
        currentJob: Object.assign(currentJob, { builds: payload.details || [] }),
        fetching: false
      };
    case SET_SELECTED_JOBS:
      return {
        ...state,
        selected: payload.selected || 'all'
      };
    case SET_UPDATER:
      return {
        ...state,
        currentUpdater: payload.updater
      }
    default:
      return state;
  }
};