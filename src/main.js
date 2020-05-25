import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';

import App from './App.vue';
import router from './router';
import store from './store';
import './scss/custom.scss';
import AxiosPlugin from './plugins/AxiosPlugin';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(AxiosPlugin, { store, router });
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
