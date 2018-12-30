<template>
  <v-app>
    <v-navigation-drawer
      v-model="navigationMenu.show"
      app
      absolute
      overflow
    >
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>블레이드&소울 레볼루션</v-list-tile-sub-title>
            <v-list-tile-title>리젠 타이머</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

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
        <span>{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <Regen :world="selectedWorld"/>
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
  },
};
</script>
