import Vue from 'vue';
import axios from 'axios';

function axiosPlugin(options) {
  return new Vue({
    data() {
      return {
        axiosInstance: null,
        axiosOptions: {
          // baseURL: 'https://api.covidoptimize.org/v1/',
          baseURL: 'http://localhost:8000/v1/',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': '',
          },
        },
      };
    },
    created() {
      this.createAxios();
    },
    computed: {
      jwtToken() {
        return options.store.getters['auth/jwt'];
      },
    },
    watch: {
      jwtToken(token) {
        this.axiosOptions.headers['x-access-token'] = token;
        this.createAxios();
      },
    },
    methods: {
      createAxios() {
        this.axiosInstance = axios.create(this.axiosOptions);
        this.resIntercept();
      },
      resIntercept() {
        this.axiosInstance.interceptors.response.use(
          (res) => res,
          (error) => {
            if (
              (error.response.status !== 500 &&
                error.response.status !== 401) ||
              ['Login', 'EmailPassword', 'ResetPassword'].some(
                (x) => x === options.router.currentRoute.name
              )
            ) {
              return new Promise((resolve, reject) => {
                reject(error);
              });
            } else {
              options.store.dispatch('auth/logout');
              options.router.replace({
                name: 'Login',
              });
              return new Promise((resolve, reject) => {
                reject(error);
              });
            }
          }
        );
      },
      async get(url, config = {}) {
        return this.axiosInstance.get(url, config);
      },
      post(url, data, config = {}) {
        return this.axiosInstance.post(url, data, config);
      },
    },
  });
}

export default {
  install(vue, options) {
    vue.prototype.$api = axiosPlugin(options);
  },
};
