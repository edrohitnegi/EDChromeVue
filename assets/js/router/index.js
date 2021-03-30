import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../components/Welcome';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import(/* webpackChunkName: "charts" */ '../components/SkillGraph.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
