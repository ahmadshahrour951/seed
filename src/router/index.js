import Vue from 'vue';
import VueRouter from 'vue-router';

import AppAux from '../components/layout/AppAux.vue';
import Login from '../components/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'AppAux',
    component: AppAux,
    redirect: {
      name: 'Login'
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
