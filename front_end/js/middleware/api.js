'use strict';

const checkStatus = (result) => {
  const { status, statusText } = result;

  if (!status) {
    throw new Error('unknown error');
  }

  if (status < 200 || status > 300) {
    throw new Error(statusText);
  }

  return;
}

const api = () => {
  return (next) => async (action) => {
    const { api, types, ...rest } = action;

    if (!api) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({ rest, type: REQUEST})

    try {
      const { url, params } = api;
      const results = await fetch(`/api${url}`, params);
      checkStatus(results);
      const payload = await results.json();
      next({ ...rest, payload, type: SUCCESS})
    } catch(error) {
      return next({ ...rest, error, type: FAILURE})
    }
  }
}

export default api;