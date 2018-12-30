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
    selectedServerId: localStorage.getItem('selectedServerId') || '',
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
    setServerId(state, id) {
      state.selectedServerId = id;
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
    async loadBossHistories({ commit }, serverId) {
      const histories = await historiApi.getBossHistories(serverId);
      commit('setBossHistories', histories);
    },
    setServerId({ commit }, id) {
      localStorage.setItem('selectedServerId', id);
      commit('setServerId', id);
    },
    setWorldId({ commit }, id) {
      localStorage.setItem('selectedWorldId', id);
      commit('setWorldId', id);
    },
    async saveRegenInfo({ dispatch, state }, info) {
      const serverId = state.selectedServerId;
      await historiApi.saveBossRegenInfo({ sid: serverId, ...info });
      dispatch('loadBossHistories', state.selectedServerId);
    },
  },
});
