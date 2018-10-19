import Vue from 'vue';
import Vuex from 'vuex';
import {quantize5minPerDay} from "../lib/helpers";

Vue.use(Vuex);

const state = {
  isLogged: !!localStorage.getItem('token'),
  startDayMetricData: [],
  endDayMetricData: []
};

const mutations = {
  LOGIN_USER(curState) {
    curState.isLogged = true;
  },

  LOGOUT_USER(curState) {
    curState.isLogged = false;
  },
  START_DAY_METRIC(curState, data) {
    curState.startDayMetricData = data;
  },
  END_DAY_METRIC(curState, data) {
    curState.endDayMetricData = data;
  }
};

const actions = {
  async metric({commit}) {
    Vue.http.get('values/minutes?metric_id=594').then((response) => {
      commit('START_DAY_METRIC', quantize5minPerDay(response.body.values.curr[Object.keys(response.body.values.curr)[0]]));
      commit('END_DAY_METRIC', quantize5minPerDay(response.body.values.curr[Object.keys(response.body.values.prev)[0]]))
    })
  }
};
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
});
