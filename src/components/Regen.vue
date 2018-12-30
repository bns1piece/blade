<template>
  <v-container fluid grid-list-md class="pa-0">
    <v-expansion-panel expand>
      <v-expansion-panel-content
        v-for="field in world.fields"
        :key="field.id"
      >
        <div slot="header" class="field-header">
          <div class="valign-center">{{ field.name }}</div>
          <div v-if="field.boss" class="field-header-boss">
            <div>{{ getBossName(field.boss) }}</div>
            <div>재등장 소요시간 {{ getBossInterval(field.boss) }}분</div>
          </div>
        </div>
        <v-container fluid grid-list-md class="channels-container">
          <v-data-iterator
            v-if="field.boss"
            content-tag="v-layout"
            :items="getChannelBosses(world.id, field)"
            row
            wrap
            hide-actions
          >
            <v-flex slot="item" slot-scope="props" xs6 sm4 md4 lg3 xl2>
              <regen-detail 
                :boss="props.item" 
                @clickAdd="(channel) => onClickRegenTime(world.id, field, props.item.channel)">
              </regen-detail>
            </v-flex>
          </v-data-iterator>
          <v-btn block round color="blue white--text" 
            @click="() => addChannel(world.id, field)">
            <v-icon>add</v-icon>
          </v-btn>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <RegenInputDialog 
      v-model="showInputForm" 
      :place="regenPlace" 
      @close="showInputForm = false"
      @save="onSave"
      />
    <SelectionBlockDialog 
      v-model="showSelectChannelDialog" 
      :items="availableChannels"
      @select="onSelectChannel"
      />
  </v-container>
</template>

<script>
import RegenDetail from './RegenDetail.vue';
import RegenInputDialog from './RegenInputDialog.vue';
import SelectionBlockDialog from './SelectionBlockDialog.vue';

export default {
  name: 'Regen',
  components: { RegenDetail, RegenInputDialog, SelectionBlockDialog },
  data() {
    return {
      picker: {},
      showInputForm: false,
      regenPlace: {},
      showSelectChannelDialog: false,
      availableChannels: [],
      infoForChannel: {},
    };
  },
  props: ['world'],
  methods: {
    getChannelBosses(wid, { id: fid, boss }) {
      if (!boss) {
        return [];
      }

      const {
        [wid]: {
          [fid]: histories = {},
        } = {},
      } = this.$store.state.bossHistories;

      const result = Object.keys(histories)
        .map(channel => ({
          channel,
          interval: boss.interval,
          time: histories[channel].boss.time,
        }));
      result.sort((a, b) => (a.channel < b.channel ? -1 : 1));
      return result;
    },
    getBossName(boss = {}) {
      return boss.name || '';
    },
    getBossInterval(boss = {}) {
      return boss.interval || 9999;
    },
    onClickRegenTime(wid, field, channel) {
      this.regenPlace = {
        wid,
        fid: field.id,
        fieldName: field.name,
        channel,
      };
      this.showInputForm = true;
    },
    onSave(data) {
      this.$store.dispatch('saveRegenInfo', data);
      this.showInputForm = false;
    },
    addChannel(wid, field) {
      const { id: fid } = field;
      const {
        [wid]: {
          [fid]: channels = {},
        } = {},
      } = this.$store.state.bossHistories;

      this.infoForChannel = { wid, field };
      this.availableChannels = Array(9)
        .fill(0)
        .map((v, i) => String(i + 1))
        .filter(n => !channels[n])
        .map(n => ({ value: n, text: n }));
      this.showSelectChannelDialog = true;
    },
    onSelectChannel(channel) {
      if (!channel) {
        return;
      }

      const { wid, field } = this.infoForChannel;
      this.onClickRegenTime(wid, field, channel);
    },
  },
};
</script>

<style scoped lang="scss">
.valign-center {
  align-self: center;
}

.field-header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  &-boss {
    font-size: 11px;
    text-align: end;
  }
}

.channels-container {
  background-color: #ebebeb;  
}
</style>
