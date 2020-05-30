import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import auth from './modules/auth';
import history from './modules/history';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    history,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
