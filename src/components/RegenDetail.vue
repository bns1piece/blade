<template>
  <v-card>
    <v-card-title>
      <h4>{{ boss.channel }}채널</h4>
      <v-spacer></v-spacer>
      <span>{{ restMinute }}분 전</span>
      <v-spacer></v-spacer>
      <span>{{ nextRegenTime }}</span>
    </v-card-title>
    <v-card-text>
      <div>
        <span>등장예정</span>
        <span>{{ nextRegenTime }}</span>
      </div>
      <div>
        <span>잡힘</span>
        <span>{{ boss.time }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  props: ["boss"],
  computed: {
    restMinute() {
      return moment().diff(moment(this.nextRegenTime, 'HH:mm'), 'minutes');
    },
    nextRegenTime() {
      const { time, interval } = this.boss;
      return moment()
        .hour(time.slice(0, 2))
        .minute(time.slice(3, 5))
        .add(interval, 'm')
        .format('HH:mm');
    },
  },
  methods: {
  },
};
</script>