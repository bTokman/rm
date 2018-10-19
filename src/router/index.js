import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Groups from '@/components/groups';
import Charts from '@/components/charts';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            name: ' groups',
            component: Groups,
        },
        {
            path: '/chart',
            name: 'charts',
            component: Charts,
        }
    ],
});

