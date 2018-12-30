<template>
  <v-dialog
    :value="value"
    @input="onInput"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable>
    <v-card tile>
    <v-toolbar class="toolbar" flat>
            <v-btn icon @click="() => onInput(false)">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title class="toolbar--text">잡은 시간 입력</v-toolbar-title>
            <v-btn 
                small 
                color="blue lighten-1 white--text" 
                @click="onSave">
                Save
            </v-btn>
        </v-toolbar>
        <v-divider />
        <v-card-text>
            <v-list>
                <v-list-tile style="height: 50px;">
                    <v-list-tile-content>
                        <div class="place">
                            <div class="place--label">장소</div>
                            <div class="place--text">{{fieldName}}</div>
                            <div class="place--text">{{channel}} 채널</div>
                        </div>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-time-picker full-width v-model="time"></v-time-picker>
        </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
    props: ['value', 'place'],
    mounted() {
        this.time = moment().format('HH:mm');
    },
    data() {
        return {
            time: null,
        };
    },
    computed: {
        fieldName() {
            return this.place.fieldName;
        },
        channel() {
            return this.place.channel;
        },
    },
    methods: {
        onInput(...args) {
            this.$emit('input', ...args);
        },
        onSave() {
            const { wid, fid, channel } = this.place;
            let time = moment(this.time, 'HH:mm');
            if (moment().diff(time) < 0) {
                time = time.subtract(1, 'days');
            }
            this.$emit('save', {
                wid,
                fid,
                channel,
                time: time.valueOf(),
            });
        },
    },
};
</script>

<style scoped lang="scss">
.toolbar {
    height: 60px;
    background-color: white;

    &--text {    
        width: 100%;
        text-align: center;
        padding-right: 56px;
    }
}

.place {
    width: 100%;
    height: 100%;
    display: flex;

    &--label {
        padding-top: 10px;
        font-size: 12px;
        color: #777777;
        padding-right: 20px;
        flex-grow: 1;
    }

    &--text {
        padding-top: 10px;
        font-weight: bold;
        flex-grow: 2;
    }
}

.time {
    width: 100%;
    height: 100%;
    display: flex;

    &--label {
        padding-top: 10px;
        font-size: 12px;
        color: #777777;
        padding-right: 20px;
        flex-grow: 1;
    }

    &--hhmm {
        flex-grow: 4;
    }
}

</style>
