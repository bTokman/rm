import Vue from 'vue';
import Vuex from 'vuex';
import {buildForOneDay} from "../lib/helpers";

Vue.use(Vuex);

/** App state **/
const state = {
  isLogged: !!localStorage.getItem('token'),
  startDayMetricData: [],
  endDayMetricData: [],
  metrics: [],
  slices: [],
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
  }
};

/** Actions **/
const actions = {
  async getMetricData({commit}, params) {
    await Vue.http.get(`values/minutes?metric_id=${params.id}`).then((response) => {
      commit('START_DAY_METRIC', buildForOneDay(response.body.values.prev[Object.keys(response.body.values.prev)[0]]));
      commit('END_DAY_METRIC', buildForOneDay(response.body.values.curr[Object.keys(response.body.values.curr)[0]]))
    })
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
  }
};


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
});
