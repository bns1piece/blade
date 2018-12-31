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
          <v-select
            :items="servers"
            :value="selectedServer.id"
            item-value="id"
            item-text="name"
            label="Select Server"
            @input="selectServer"
          ></v-select>
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
  </v-app>
</template>

<script>
import Regen from './components/Regen.vue';

export default {
  name: 'App',
  components: {
    Regen,
  },
  async mounted() {
    await this.$store.dispatch('loadServers');
    await this.$store.dispatch('loadWorlds');
    this.$store.dispatch('loadBossHistories', this.$store.state.servers[0].id);
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
      return this.$store.state.servers;
    },
    selectedServer() {
      return this.servers.find(s => s.id === this.$store.state.selectedServerId) || {};
    },
    worlds() {
      return this.$store.state.worlds;
    },
    selectedWorld() {
      return this.worlds.find(w => w.id === this.$store.state.selectedWorldId) || {};
    },
    title() {
      return this.selectedWorld.name || '';
    },
  },
  methods: {
    navigationMenuShowHide() {
      this.navigationMenu.show = !this.navigationMenu.show;
    },
    selectWorld(world) {
      this.$store.dispatch('setWorldId', world.id);
      this.navigationMenuShowHide();
    },
    selectServer(serverId) {
      this.$store.dispatch('setServerId', serverId);
    },
    track() {
      this.$ga.page('/');
    },
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
