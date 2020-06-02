import HistoryService from '@/services/history.service.js';
import moment from 'moment';

const state = {
  inputs: [],
  filters: {
    users: {
      options: [],
      selected: [],
    },
    dateRange: {
      startDate: null,
      endDate: null,
    },
  },
};

const getters = {
  tableItems: (state) => {
    return state.inputs.map((x) => {
      return {
        id: x.id,
        erWaitTime: x.erWaitTime,
        icuBedCount: x.icuBedCount,
        regularBedCount: x.regularBedCount,
        ventilatorCount: x.ventilatorCount,
        fullName: `${x.user.firstName} ${x.user.lastName}`,
        createdAt: moment(x.createdAt).format('MMMM Do YYYY, h:mm a'),
      };
    });
  },
  isFiltersEmpty: (state) => {
    return !(
      state.filters.users.selected.length ||
      state.filters.dateRange.startDate ||
      state.filters.dateRange.endDate
    );
  },
  avHospitalUsers: (state) => {
    return state.filters.users.options;
  },
};

const mutations = {
  storeInputs(state, payload) {
    state.inputs = payload;
  },
  storeAvUsers(state, payload) {
    state.filters.users.options = payload;
  },
  storeSelectedUsers(state, payload) {
    state.filters.users.selected = payload;
  },
  storeDateRange(state, payload) {
    state.filters.dateRange = payload;
  },
};

const actions = {
  async fetchInputs({ commit, state, rootGetters }, payload) {
    const { hospitalId } = rootGetters['auth/jwtData'];
    const { dateRange } = state.filters;
    const users = state.filters.users.selected.map((x) => x.id);

    const apiPayload = {
      hospitalId,
    };

    if (dateRange.startDate && dateRange.endDate) {
      apiPayload.dateRange = dateRange;
    }

    if (users.length) {
      apiPayload.users = users;
    }

    const inputsRes = await HistoryService.getInputs(payload.api, apiPayload);
    commit('storeInputs', inputsRes);
  },
  async fetchHospitalUsers({ commit, rootGetters }, payload) {
    const { hospitalId } = rootGetters['auth/jwtData'];
    const usersRes = await HistoryService.getHospitalUsers(
      payload.api,
      hospitalId
    );
    commit('storeAvUsers', usersRes);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
