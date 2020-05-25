import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';

import AppAux from '@/components/layout/AppAux.vue';
import Login from '@/components/Login.vue';
import EmailPassword from '@/components/EmailPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';

import Dashboard from '@/components/Dashboard.vue';
import InputHistory from '@/components/InputHistory.vue';
import AddInput from '@/components/AddInput.vue';
import Profile from '@/components/Profile.vue';

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
        path: '/reset/:passwordToken',
        name: 'ResetPassword',
        component: ResetPassword,
      },
      {
        path: '/reset',
        name: 'EmailPassword',
        component: EmailPassword,
      },
      {
        path: 'dashboard',
        component: Dashboard,
        children: [
          { path: '', name: 'Dashboard', component: InputHistory },
          { path: 'input', name: 'AddInput', component: AddInput },
          { path: 'profile', name: 'Profile', component: Profile },
        ],
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
