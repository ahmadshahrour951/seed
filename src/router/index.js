import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';

import AppAux from '../components/layout/AppAux.vue';
import Login from '../components/Login.vue';
import InfoInput from '../components/InfoInput.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'AppAux',
    component: AppAux,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'input',
        name: 'InfoInput',
        component: InfoInput,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = store.state.auth.status.loggedIn;

// trying to access a restricted page + not logged in
// redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
