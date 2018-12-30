<template>
  <v-dialog :value="value" @input="onInput" max-width="500px">
    <v-card>
      <v-card-title>
        Channels
      </v-card-title>
      <v-card-text>
        <v-select
          :items="items"
          label="Select Channel"
          v-model="selectedItem"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" flat @click="onSelect">Select</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['value', 'items'],
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
  },
  methods: {
      onInput(...args) {
        this.$emit('input', ...args);
      },
      onSelect() {
        this.$emit('select', this.selectedItem);
        this.onInput(false);
      },
  },
};
</script>

<style scoped lang="scss">
.block {
  padding: 3px 5px;
  height: 100px;
  width: 100px;
  flex-basis: 300px;
  border: #777777 1px solid;
}
</style>
