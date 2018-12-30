import Vue from 'vue';
import Vuex from 'vuex';

import infoApi from './apis/info-api';
import historiApi from './apis/history-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers: [],
    worlds: [],
    bossHistories: {},
    selectedWorldId: localStorage.getItem('selectedWorldId') || '',
  },
  mutations: {
    setServers(state, servers) {
      state.servers = servers;
    },
    setWorlds(state, worlds) {
      state.worlds = worlds;
    },
    setBossHistories(state, bossHistories) {
      state.bossHistories = bossHistories;
    },
    setWorldId(state, id) {
      state.selectedWorldId = id;
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
    async loadBossHistories({ commit }, server) {
      const histories = await historiApi.getBossHistories(server);
      commit('setBossHistories', histories);
    },
    setWorldId({ commit }, id) {
      localStorage.setItem('selectedWorldId', id);
      commit('setWorldId', id);
    },
  },
});
