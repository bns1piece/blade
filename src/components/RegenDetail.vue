<template>
  <v-card>
    <v-card-title class="space-between">
      <h4 class="title-channel">{{ boss.channel }}채널</h4>
      <span 
        :class="['title-rest-time', getRestMinute() <= 5 ? 'impending-time' : '']">
        {{ getRestMinute() }}분 전
      </span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <div class="space-between">
        <span class="sub-label">등장예정</span>
        <span class="gen-time">{{ getNextRegenTime() }}</span>
      </div>
      <div class="space-between">
        <span></span>
        <span>up-icon</span>
      </div>
      <div class="space-between">
        <span class="sub-label">잡힘</span>
        <span class="gen-time">{{ deathTime }}</span>
      </div>
    </v-card-text>
    <v-card-actions class="flex-center">
      <v-btn outline round class="add-time-button" @click="onClickAdd">잡은 시간 입력</v-btn>
    </v-card-actions>
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
    onClickAdd() {
      this.$emit('clickAdd');
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  &-channel {
    color: #888888;
    font-size: 16px;
  }

  &-rest-time {
    font-size: 20px;
    font-weight: bold;
  }
}
.sub-label {
  color: #c3c3c3;
}

.gen-time {
  font-size: 16px;
}

.impending-time {
  color: #c70000;
}

.space-between {
  display: flex;
  justify-content: space-between;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.add-time-button {
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #515151;
  border: 1px solid #e9ddfd;
}
</style>
