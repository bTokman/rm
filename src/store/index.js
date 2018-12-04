import Vue from 'vue';
import Vuex from 'vuex';
import {buildForOneDay, buildForOneWeek, buildForOneMonth, buildForOneQuarterly} from '../lib/helpers';
import {
  current,
  currentMonday,
  firstDayOfCurrentMonth,
  previousSunday,
  previousMonday,
  firstDayOfPrevMonth,
  firstDayOfPrevQuarterly,
  firstDayOfCurrentQuarterly,
  lastDayOfPrevMonth,
  lastDayOfPrevQuarterly
} from '../lib/dates';
import moment from 'moment';

Vue.use(Vuex);

/** App state **/
const state = {
  isLogged: !!localStorage.getItem('token'),
  metrics: [],
  slices: [],
  startDayMetricData: [],
  endDayMetricData: [],
  startWeekMetricData: [],
  endWeekMetricData: [],
  startMonthMetricData: [],
  endMonthMetricData: [],
  startQuarterlyMetricData: [],
  endQuarterlyMetricData: []
};

/** Mutation **/
const mutations = {
  LOGIN_USER(curState) {
    curState.isLogged = true;
  },
  START_DAY_METRIC(curState, data) {
    curState.startDayMetricData = data;
  },
  END_DAY_METRIC(curState, data) {
    curState.endDayMetricData = data;
  },
  GET_ALL_METRICS(curState, data) {
    curState.metrics = data;
  },
  GET_SLICES(curState, data) {
    curState.slices = data;
  },
  SET_WEEK_START_DATA(curState, data) {
    curState.startWeekMetricData = data;
  },
  SET_WEEK_END_DATA(curState, data) {
    curState.endWeekMetricData = data;
  },
  SET_MONTH_START_DATA(curState, data) {
    curState.startMonthMetricData = data;
  },
  SET_MONTH_END_DATA(curState, data) {
    curState.endMonthMetricData = data;
  },
  SET_QUARTERLY_START_DATA(curState, data) {
    curState.startQuarterlyMetricData = data;
  },
  SET_QUARTERLY_END_DATA(curState, data) {
    curState.endQuarterlyMetricData = data;
  }
};

/** Actions **/
const actions = {

  clearMetric({commit}) {
    commit('START_DAY_METRIC', []);
    commit('END_DAY_METRIC', []);
    commit('SET_WEEK_START_DATA', []);
    commit('SET_WEEK_END_DATA', []);
    commit('SET_QUARTERLY_START_DATA', []);
    commit('SET_QUARTERLY_END_DATA', []);
  },

  async getMetricData({commit}, params) {
    /** Get day data **/
    await Vue.http.get(`values/minutes?metric_id=${params.id}`).then((response) => {
      commit('START_DAY_METRIC', buildForOneDay(response.body.values.prev[Object.keys(response.body.values.prev)[0]]));
      commit('END_DAY_METRIC', buildForOneDay(response.body.values.curr[Object.keys(response.body.values.curr)[0]]));
    });

    /** Get week data **/
    await Vue.http.get(`values/days?metric_id=${params.id}&from=${currentMonday}&to=${current}&prev_from=${previousMonday}&prev_to=${previousSunday}`).then((response) => {
      commit('SET_WEEK_START_DATA', buildForOneWeek(response.body.values.prev));
      commit('SET_WEEK_END_DATA', buildForOneWeek(response.body.values.curr));
    });

    /** Get month data **/
    await Vue.http.get(`values/days?metric_id=${params.id}&from=${firstDayOfCurrentMonth}&to=${current}&prev_from=${firstDayOfPrevMonth}&prev_to=${lastDayOfPrevMonth}`).then((response) => {
      commit('SET_MONTH_START_DATA', buildForOneMonth(response.body.values.prev, true));
      commit('SET_MONTH_END_DATA', buildForOneMonth(response.body.values.curr));
    });

    /** Get quarterly data **/
    await Vue.http.get(`values/days?metric_id=${params.id}&from=${firstDayOfCurrentQuarterly}&to=${current}&prev_from=${firstDayOfPrevQuarterly}&prev_to=${lastDayOfPrevQuarterly}`).then((response) => {
      commit('SET_QUARTERLY_START_DATA', buildForOneQuarterly(response.body.values.prev));
      commit('SET_QUARTERLY_END_DATA', buildForOneQuarterly(response.body.values.curr));
    });

  },
  async getSlices({commit}, params) {
    await Vue.http.get(`slices/${params.id}`).then((response) => {
      commit('GET_SLICES', response.body.slices);
    })
  },
  async getMetrics({commit}) {
    await  Vue.http.get(`metrics`).then((response) => {
      commit('GET_ALL_METRICS', response.body.metrics);
    })
  },
  async getMetricSlice({commit}, params) {
    await Vue.http.get(`values/minutes?metric_id=${params.metricId}&slice_id=${params.sliceId}`).then((response) => {
      commit('START_DAY_METRIC', buildForOneDay(response.body.values.prev[Object.keys(response.body.values.prev)[0]]));
      commit('END_DAY_METRIC', buildForOneDay(response.body.values.curr[Object.keys(response.body.values.curr)[0]]))
    });

    /** Get week data **/
    await Vue.http.get(`values/days?metric_id=${params.metricId}&slice_id=${params.sliceId}&from=${currentMonday}&to=${current}&prev_from=${previousMonday}&prev_to=${previousSunday}`).then((response) => {
      commit('SET_WEEK_START_DATA', buildForOneWeek(response.body.values.prev));
      commit('SET_WEEK_END_DATA', buildForOneWeek(response.body.values.curr));
    });

    /** Get month data **/
    await Vue.http.get(`values/days?metric_id=${params.metricId}&slice_id=${params.sliceId}&from=${firstDayOfCurrentMonth}&to=${current}&prev_from=${firstDayOfPrevMonth}&prev_to=${lastDayOfPrevMonth}`).then((response) => {
      commit('SET_MONTH_START_DATA', buildForOneMonth(response.body.values.prev, true));
      commit('SET_MONTH_END_DATA', buildForOneMonth(response.body.values.curr));
    });

    /** Get quarterly data **/
    await Vue.http.get(`values/days?metric_id=${params.metricId}&slice_id=${params.sliceId}&from=${firstDayOfCurrentQuarterly}&to=${current}&prev_from=${firstDayOfPrevQuarterly}&prev_to=${lastDayOfPrevQuarterly}`).then((response) => {
      commit('SET_QUARTERLY_START_DATA', buildForOneQuarterly(response.body.values.prev));
      commit('SET_QUARTERLY_END_DATA', buildForOneQuarterly(response.body.values.curr));
    });
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
});
