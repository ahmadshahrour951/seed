import Vue from 'vue';
import axios from 'axios';

export default {
  install(vue, options) {
    vue.prototype.$api = new Vue({
      data() {
        return {
          axiosOptions: {
            baseURL: 'http://localhost:8000/api/v1/',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': '',
            },
          },
        };
      },
      computed: {
        createAxios() {
          return axios.create(this.axiosOptions);
        },
        jwtToken() {
          return options.store.getters['auth/jwt'];
        },
      },
      watch: {
        jwtToken(token) {
          this.axiosOptions.headers['x-access-token'] = token;
        },
      },
      methods: {
        get(url) {
          return this.createAxios.get(url);
        },
        post(url, data) {
          return this.createAxios.post(url, data);
        },
      },
    });
  },
};
