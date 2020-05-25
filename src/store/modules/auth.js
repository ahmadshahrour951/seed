import AuthService from '../../services/auth.service';
import router from '../../router';

const state = {
  status: { loggedIn: false },
  currentJWT: null,
  expiresAt: null,
};

const getters = {
  jwt: (state) => {
    return state.currentJWT;
  },
  jwtData: (state, getters) =>
    state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
  // jwtSubject: (state, getters) =>
  //   getters.jwtData ? getters.jwtData.sub : null,
  // jwtIssuer: (state, getters) => (getters.jwtData ? getters.jwtData.iss : null),
};

const mutations = {
  // setCsrfToken(state, res) {
  //   state.csrf = res.config.headers['X-XSRF-TOKEN'];
  //   console.log(res);
  // },
  loginSuccess(state, payload) {
    state.status.loggedIn = true;
    state.currentJWT = payload.token;
    state.expiresAt = payload.expiresAt;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.currentJWT = null;
    state.expiresAt = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.currentJWT = null;
    state.expiresAt = null;
  },
};
const actions = {
  // setCsrf({ commit }, payload) {
  //   return AuthService.fetchCsrfToken(payload.api).then((res) =>
  //     commit('setCsrfToken', res)
  //   );
  // },
  login({ commit }, payload) {
    return AuthService.login(payload.api, payload.user).then(
      (resPayload) => {
        commit('loginSuccess', resPayload);
        return Promise.resolve(resPayload);
      },
      (error) => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  async tryAutoLogin({ commit }) {
    try {
      const resPayload = await AuthService.autoLogin();
      commit('loginSuccess', resPayload);
      if (router.currentRoute.name === 'AppAux') {
        router.replace({ name: 'Dashboard' });
      }
      return Promise.resolve(resPayload);
    } catch (error) {
      commit('loginFailure');
      await AuthService.logout();
      if (router.currentRoute.name !== 'Login') {
        router.replace({
          name: 'Login',
        });
      }
    }
  },
  async logout({ commit }) {
    await AuthService.logout();
    commit('logout');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
