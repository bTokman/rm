import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import App from './App';
import router from './router';
import HighchartsVue from 'highcharts-vue'
import store from './store';
import {apiPath, configureAuthHeaders} from './lib/helpers';

import '../static/styles.css'

/**
 *  Init plugins
 */
Vue.use(VueResource);
Vue.use(HighchartsVue);
Vue.use(Router);

/**
 * Set global api path
 * @type {string}
 */
Vue.http.options.root = apiPath;


/**
 * Configure basic auth
 */
configureAuthHeaders();

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
