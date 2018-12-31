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
    async loadBossHistories({ commit, state }) {
      const { selectedServerId: sid, selectedWorldId: wid } = state;
      if (!sid || !wid) {
        return;
      }
      const histories = await historiApi.getBossHistories(sid, wid);
      commit('setBossHistories', histories);
    },
    setServerId({ commit, dispatch }, id) {
      localStorage.setItem('selectedServerId', id);
      commit('setServerId', id);
      dispatch('loadBossHistories');
    },
    setWorldId({ commit, dispatch }, id) {
      localStorage.setItem('selectedWorldId', id);
      commit('setWorldId', id);
      dispatch('loadBossHistories');
    },
    async saveRegenInfo({ dispatch, state }, info) {
      const { selectedServerId: sid, selectedWorldId: wid } = state;
      await historiApi.saveBossRegenInfo({ sid, wid, ...info });
      dispatch('loadBossHistories');
    },
  },
});
