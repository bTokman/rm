import Router from 'vue-router';
import Login from '@/components/login';
import Groups from '@/components/groups';
import Charts from '@/components/charts';
import SubGroup from '@/components/subgroup';

export default new Router({
  scrollBehavior() {
    return {x: 0, y: 0};
  },
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
      path: '/chart/:id',
      name: 'charts',
      component: Charts,
    },
    {
      path: '/subgroup/:name',
      name : 'subgroup',
      component: SubGroup
    }

  ],
});
