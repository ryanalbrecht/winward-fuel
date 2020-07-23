<template>
  <div class="time-elapsed-wrap" :style="{width: width || '130px'}">
    <div class="row">
      <div class="col" style="font-size: var(--fuel-font-size); text-align:center">
        Remaining
      </div>
    </div>
    <div class="row">
      <div class="col time-remaining">
        {{ format(times.remainingtime, false) }}
      </div>
    </div>
    <div class="row">
      <div class="col">Local</div>
      <div class="col">{{ format(times.localtime, false) }}</div>
    </div>
    <div class="row">
      <div class="col">Session</div>
      <div class="col">{{ format(times.sessiontime, false) }}</div>
    </div>
    <div class="row">
      <div class="col">Checkered</div>
      <div class="col">{{ format(times.finishtime, false) }}</div>
    </div>
    <div class="row">
      <div class="col">Length</div>
      <div class="col">{{ format(times.length, false) }}</div>
    </div>
  </div>
</template>

<script>
import * as time from '../lib/time'

export default {
  name: 'TimeElapsed',
  data: function () {
    return {
      times: this.$store.state.race
    }
  },
  methods: {
    format: time.format
  },
  props: {
    width: Number
  }
}
</script>

<style scoped>
  .col:nth-child(2) {
    text-align: right;
  }
</style>

<style>
  .time-elapsed-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }

  .time-remaining {
    font-size: 20px;
    text-align: center;
    background-color: rgb(197, 217, 241);
  }
</style>
