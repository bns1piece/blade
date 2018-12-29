<template>
  <v-container fluid grid-list-md class="pa-0">
    <v-expansion-panel expand>
      <v-expansion-panel-content
        v-for="field in world.fields"
        :key="field.id"
      >
        <div slot="header">{{ field.name }}</div>
        <v-data-iterator
          content-tag="v-layout"
          :items="channelBosses(world.id, field.id)"
          row
          wrap
          hide-actions
        >
          <v-flex slot="item" slot-scope="props" xs6 sm4 md4 lg3 xl2>
            <v-card light>
              <v-card-title>
                <h4>{{ props.item.channel }}채널</h4>
                <v-spacer></v-spacer>
                <span v-if="props.item.time">{{ props.item.time }}</span>
                <span v-else>-</span>
                <v-spacer></v-spacer>
                <span v-if="props.item.time">
                  {{ nextRegenTime(props.item.time, field.boss) }}
                </span>
                <span v-else>-</span>
              </v-card-title>
              <!--<v-divider></v-divider>-->
              <!--<v-list v-for="(channel, j) in props.item.channels" :key="j" dense>-->
                <!--<v-list-tile>-->
                  <!--<v-list-tile-content>{{channel.no}}채널</v-list-tile-content>-->
                  <!--<v-list-tile-content v-if="channel.prev">-->
                    <!--{{channel.prev}}-->
                  <!--</v-list-tile-content>-->
                  <!--<v-list-tile-content v-else>-->
                    <!-- - -->
                  <!--</v-list-tile-content>-->
                  <!--<v-list-tile-content v-if="channel.prev" class="font-weight-bold">-->
                    <!--{{nextRegenTime(channel.prev, channel.regenTime)}}-->
                  <!--</v-list-tile-content>-->
                  <!--<v-list-tile-content v-else>-->
                    <!-- - -->
                  <!--</v-list-tile-content>-->
                  <!--<v-icon class="mx-1" small color="primary">edit</v-icon>-->
                  <!--<v-icon class="mx-1" small color="error">cancel</v-icon>-->
                <!--</v-list-tile>-->
              <!--</v-list>-->
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--<v-time-picker @input="onPickerInput"></v-time-picker>-->
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Regen',
  data() {
    return {
      picker: {},
    };
  },
  props: ['world'],
  methods: {
    onPickerInput(input) {
      console.log('input: ', input);
    },
    nextRegenTime(prev, { interval } = {}) {
      if (!interval) {
        return '--:--';
      }
      return moment()
        .hour(prev.slice(0, 2))
        .minute(prev.slice(3, 5))
        .add(interval, 'm')
        .format('HH:mm');
    },
    channelBosses(wid, fid) {
      const {
        [wid]: {
          [fid]: result = {},
        } = {},
      } = this.$store.state.bossHistories;

      return Object.keys(result)
        .map(channel => ({
          channel,
          time: result[channel].time,
        }));
    },
  },
};
</script>

<style scoped>

</style>
