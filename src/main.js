import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import HighchartsVue from 'highcharts-vue'
import store from './store';


import {apiPath, configureAuthHeaders} from './lib/helpers';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(HighchartsVue);

Vue.http.options.root = apiPath;
configureAuthHeaders();

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
