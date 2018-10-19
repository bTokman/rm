import Vue from 'vue';

/**
 * Create basic auth token based on user credential
 * @param username
 * @param password
 * @returns {string}
 */
export const createAuthToken = (username, password) => {
  return window.btoa(`${username}:${password}`)
};

/**
 * Api urk
 * @type {string}
 */
export const apiPath = 'https://realmetric.mailfire.io';

/**
 * Configure basic http authorization headers
 * @returns {boolean}
 */
export const configureAuthHeaders = () => {
  const token = localStorage.getItem('token');

  if (!token) return false;

  Vue.http.interceptors.push(function (request, next) {
    request.headers.set('Authorization', `Basic ${token}`);
    next()
  });
};

export function quantize5minPerDay(period = {}) {
  let res = {}
  if (period === null) return res
  let total = 0
  const data = [...Array(1440)].reduce((r, _, i) => ( r[i] = ( period[i] || null ), r ), {})
  Object.keys(data).forEach((el, i) => {
    total += +data[el]
    if (++i % 5 === 0) {
      res[i - 5] = total || null
      total = 0
    }
  })
  return res
}
