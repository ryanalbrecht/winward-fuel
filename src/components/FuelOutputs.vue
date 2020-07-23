<template>
  <div class="fuel-output-wrap" :style="{width: width || '150px'}">
    <div class="col">
      <div class="row">
        <div class="col">max time</div>
        <div class="col">{{ format(car.capacity / car.fuelPerLap * car.laptime, false)  }}</div>
      </div>
      <div class="row">
        <div class="col">max laps</div>
        <div class="col">{{ round(car.capacity / car.fuelPerLap) }}</div>
      </div>
      <div class="row">
        <div class="col">fuel time</div>
        <div class="col">{{ round(car.capacity / car.ltrPerSec) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as time from '../lib/time'

export default {
  name: 'FuelOutputs',
  props: {
    width: Number,
    car: Object
  },
  methods: {
    format: time.format,
    round: function (number) { return number.toFixed(1) }
  }
}
</script>

<style scoped>


  .fuel-output-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }


  .col:nth-child(1) {
    text-align: right;
    padding-right:3px;
  }

  .col:nth-child(2) {
    width: 80px;
    background: rgb(64, 211, 142);
    border: 1px solid rgb(64, 211, 142);
    padding-right: 3px;
  }

</style>
