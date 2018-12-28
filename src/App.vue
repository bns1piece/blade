<template>
  <v-app dark>
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
            <v-list-tile-title>필드 보스 타이머</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          v-for="(world, i) in worlds"
          :key="i"
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
import { WORLDS } from './constants/world-info';

export default {
  name: 'App',
  components: {
    Regen,
  },
  data() {
    return {
      navigationMenu: {
        show: false,
      },
      worlds: WORLDS,
      title: WORLDS[0].name,
      selectedWorld: WORLDS[0],
    };
  },
  methods: {
    navigationMenuShowHide() {
      this.navigationMenu.show = !this.navigationMenu.show;
    },
    changeTitle(newTitle) {
      this.title = newTitle;
    },
    selectWorld(world) {
      this.selectedWorld = world;
      this.changeTitle(world.name);
      this.navigationMenuShowHide();
    },
  },
};
</script>
