import axios from 'axios';

import history from 'src/util/browserHistory';
import { objectToQueryString } from 'src/util/url';
import { getStoredAuthToken, removeStoredAuthToken } from 'src/util/authToken';

const defaults = {
  baseURL: '/api',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          if (error.response.data?.error?.code === 'INVALID_TOKEN') {
            removeStoredAuthToken();
            history.push('/auth');
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });

export default {
  // @ts-ignore
  get: (...args) => api('get', ...args),
  // @ts-ignore
  post: (...args) => api('post', ...args),
  // @ts-ignore
  put: (...args) => api('put', ...args),
  // @ts-ignore
  patch: (...args) => api('patch', ...args),
  // @ts-ignore
  delete: (...args) => api('delete', ...args),
};