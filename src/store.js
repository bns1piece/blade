import Vue from 'vue';
import Vuex from 'vuex';

import infoApi from './apis/info-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers: [],
    worlds: [],
  },
  mutations: {
    setServers(state, servers) {
      state.servers = servers;
    },
    setWorlds(state, worlds) {
      state.worlds = worlds;
    },
  },
  actions: {
    async loadServers({ commit }) {
      const list = await infoApi.getServers();
      commit('setServers', list);
    },
    async loadWorlds({ commit }) {
      const list = await infoApi.getWorlds();
      commit('setWorlds', list);
    },
  },
});
