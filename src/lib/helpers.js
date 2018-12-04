import Vue from 'vue';
import moment from 'moment';

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
export const apiPath = 'https://realmetric2.mailfire.io';

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


/**
 * Format data by 5 minut period
 * @param period
 */
export function quantize5minPerDay(period = {}) {
  let res = {};
  if (period === null) return res;
  let total = 0;
  const data = [...Array(1440)].reduce((r, _, i) => ( r[i] = ( period[i] || null ), r ), {})
  Object.keys(data).forEach((el, i) => {
    total += +data[el];
    if (++i % 5 === 0) {
      res[i - 5] = total || null;
      total = 0;
    }
  });
  return res
}

/**
 * Format data to day period
 * @param data
 * @returns {*[][]}
 */
export function buildForOneDay(data) {
  const today = moment().format('YYYY-MM-DD');
  const formattedData = quantize5minPerDay(data);
  return Object.keys(formattedData).map(minute => ( [
    moment.utc(today, 'YYYY-MM-DD').startOf('day').add(minute, 'minute').valueOf(),
    formattedData[minute]
  ] ));
}

/**
 * Format data to one week period
 *
 * @param data
 * @returns {*[][]}
 */
export function buildForOneWeek(data) {
  return Object.keys(data)
    .sort((a, b) =>
      moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
    )
    .map(date => [date, data[date]])
}

/**
 * Format data for one month period
 *
 * @param data
 * @param unsigned
 * @returns {number[]}
 */
export function buildForOneMonth(data, unsigned = false) {
  return Object.keys(data)
    .sort((a, b) =>
      moment.utc(a, 'YYYY-MM-DD').valueOf() - moment.utc(b, 'YYYY-MM-DD').valueOf()
    )
    .map(date => unsigned ? -data[date] : data[date])
}

/**
 * Get data for quarterly
 *
 * @param data
 * @returns {any[]}
 */
export function buildForOneQuarterly(data) {
  let months = {};

  for (let key in data) {
    if (!data.hasOwnProperty(key)) continue;

    let date = new Date(key);
    let month = date.getMonth() + 1;

    months[month] = months[month] ? months[month] + data[key] : data[key];
  }

  return Object.values(months);
}


/**
 * @param metrics
 * @param id
 * @returns {boolean}
 */
export function findMetricNameByMetricId(metrics, id) {
  Object.values(metrics).forEach((item) => {
    Object.values(item).forEach((insideItem) => {
      if (insideItem.id == id) {
        return insideItem.name;
      }
    });
  });
}
