<template>
  <v-card>
    <v-card-title>
      <h4>{{ boss.channel }}채널</h4>
      <v-spacer></v-spacer>
      <span>{{ getRestMinute() }}분 전</span>
      <v-spacer></v-spacer>
      <span>{{ getNextRegenTime() }}</span>
    </v-card-title>
    <v-card-text>
      <div>
        <span>등장예정</span>
        <span>{{ getNextRegenTime() }}</span>
      </div>
      <div>
        <span>잡힘</span>
        <span>{{ deathTime }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  props: ['boss'],
  computed: {
    deathTime() {
      return moment(this.boss.time).format('HH:mm');
    },
  },
  methods: {
    getRestMinute() {
      const { time, interval } = this.boss;
      const diffMinutes = moment().diff(moment(time), 'minutes');
      return diffMinutes % interval;
    },
    getNextRegenTime() {
      return moment()
        .add(this.getRestMinute(), 'minutes')
        .format('HH:mm');
    },
  },
};
</script>
