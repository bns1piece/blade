<template>
  <v-app>
    <v-navigation-drawer
      v-model="navigationMenu.show"
      app
      absolute
      overflow
    >
      <v-container>
        <div class="grey--text text--darken-1 font-weight-bold mb-2">블레이드&소울 레볼루션</div>
        <div class="grey--text text--darken-1 display-2">리젠 타이머</div>
      </v-container>
      <v-divider></v-divider>
      <v-list class="pa-0">
        <v-container>
          <v-combobox
            :value="selectedServer"
            :items="servers"
            item-text="name"
            label="Select Server"
            @input="selectServer"
          ></v-combobox>
        </v-container>
        <v-list-tile
          v-for="world in worlds"
          :key="world.id"
          @click="selectWorld(world)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ world.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute>
      <v-toolbar-side-icon @click.stop="navigationMenuShowHide"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ title }} - {{selectedServer.name}}</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <Regen v-if="selectedServer.id" :world="selectedWorld"/>
      <div class="not-selected-server" v-else>서버를 선택해야 합니다.</div>
    </v-content>
    <v-dialog v-model="updated" width="80%">
      <v-card>
        <v-card-title class="headline">업데이트 안내</v-card-title>
        <v-card-text>
          첫 릴리즈 이후 업데이트가 전혀 없었는데 자주는 아니지만 관리를 조금 해보려고 합니다.
          <br>
          먼저 간단한 오류 수정과 데이터 최신화를 하였고, 앞으로 UI를 좀 다듬을 예정입니다.
          <br>
          그리고 간단하게 사용자분들의 피드백을 받을 수 있는 방법을 추가해보려 합니다.
          <br>
          <br>
          <span class="red--text subheading">2019.02.24 업데이트 내용</span>
          <br>
          - 서버 미선택시 [object Object]로 표시되던 오류 수정
          <br>
          - 데이터 최신화
          <br>
          &nbsp;&nbsp;1. 필드보스 추가: 제룡림-잊혀진 계곡, 수월평원-원한의 폐허
          <br>
          &nbsp;&nbsp;2. 리젠 타임: 백청산맥-붉은 노을 분지(칼날 이빨) 480분 -> 240분
          <br>
          <br>
          이 메시지는 새로운 업데이트가 있을 때만 표시되게 할 예정입니다.
          <br>
          방법을 고민중이니 당분간은 불편해도 조금만 참아주세요.
          <br>
          <br>
          감사합니다.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="setUpdated(false)"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Regen from './components/Regen.vue';

export default {
  name: 'App',
  components: {
    Regen,
  },
  async mounted() {
    await this.loadServers();
    await this.loadWorlds();
    this.loadBossHistories();
  },
  data() {
    return {
      navigationMenu: {
        show: false,
      },
    };
  },
  computed: {
    servers() {
      return this.servers;
    },
    selectedServer() {
      return this.servers.find(s => s.id === this.selectedServerId) || '서버 선택';
    },
    worlds() {
      return this.worlds;
    },
    selectedWorld() {
      return this.worlds.find(w => w.id === this.selectedWorldId) || {};
    },
    title() {
      return this.selectedWorld.name || '';
    },
    ...mapState(['updated', 'servers', 'selectedServerId', 'selectedWorldId', 'worlds']),
  },
  methods: {
    navigationMenuShowHide() {
      this.navigationMenu.show = !this.navigationMenu.show;
    },
    selectWorld({ id }) {
      this.setWorldId(id);
      this.navigationMenuShowHide();
    },
    selectServer({ id }) {
      this.setServerId(id);
    },
    track() {
      this.$ga.page('/');
    },
    ...mapActions([
      'setUpdated',
      'loadServers',
      'loadWorlds',
      'loadBossHistories',
      'setWorldId',
      'setServerId',
    ]),
  },
};
</script>

<style scoped>
.not-selected-server {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 20px;
}
</style>
