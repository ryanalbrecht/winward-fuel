<template>
  <div class="fuel-input-wrap" :style="{width: width || '280px'}">

    <div class="row">
      <div class="col">

        <div class="row">
          <div class="col">threshold</div>
          <div class="col">
            <input
              type="text"
              :value="format(car.threshold)"
              ref="threshold"
              v-mask="'99\\:99.999'"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">laptime</div>
          <div class="col">
            <input
              type="text"
              :value="format(car.laptime)"
              ref="laptime"
              v-mask="'99\\:99.999'"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">fuel/lap</div>
          <div class="col">
            <input
              type="text"
              :value="car.fuelPerLap"
              ref="fuelPerLap"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">capacity</div>
          <div class="col">
            <input
              type="text"
              :value="car.capacity"
              ref="capacity"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">start cap</div>
          <div class="col">
            <input
              type="text"
              :value="car.startCapacity"
              ref="startCapacity"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">factor</div>
          <div class="col">
            <input
              type="text"
              :value="car.factor"
              ref="factor"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>

      </div>
      <div class="col q-pl-sm">
        <div class="row">
          <div class="col">car #</div>
          <div class="col">
            <input
              type="text"
              class="car" :value="car.number"
              ref="number"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
              readonly
            >
          </div>
        </div>
        <div class="row">
          <div class="col">pit delta</div>
          <div class="col">
            <input
              type="text"
              :value="car.pitDelta"
              ref="pitDelta"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">ltr/sec</div>
          <div class="col">
            <input
              type="text"
              :value="car.ltrPerSec"
              ref="ltrPerSec"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">function</div>
          <div class="col">
            <input
              type="text"
              :value="car.useFunction"
              ref="useFunction"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">slope</div>
          <div class="col">
            <input
              type="text"
              :value="car.slope"
              ref="slope"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
        <div class="row">
          <div class="col">intercept</div>
          <div class="col">
            <input
              type="text"
              :value="car.intercept"
              ref="intercept"
              v-on:blur="submitConfig"
              v-on:keyup.enter="$event.target.blur()"
            >
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import * as time from '../lib/time'

export default {
  name: 'FuelInputs',
  props: {
    width: Number,
    car: Object
  },
  methods: {
    format: time.format,

    submitConfig() {
      let th = time.toMS(this.$refs.threshold.value);
      let lt = time.toMS(this.$refs.laptime.value)

      let config = {
        number: this.car.number,
        threshold: !Number.isNaN(th) ? th : 0,
        laptime: !Number.isNaN(lt) ? lt : 0,
        fuelPerLap: parseFloat(this.$refs.fuelPerLap.value),
        capacity: parseFloat(this.$refs.capacity.value),
        startCapacity: parseFloat(this.$refs.startCapacity.value),
        factor: parseFloat(this.$refs.factor.value),
        number: parseFloat(this.$refs.number.value),
        pitDelta: parseFloat(this.$refs.pitDelta.value),
        ltrPerSec: parseFloat(this.$refs.ltrPerSec.value),
        useFunction: this.$refs.useFunction.value === 'true',
        slope: parseFloat(this.$refs.slope.value),
        intercept: parseFloat(this.$refs.intercept.value)
      }

      this.$store.dispatch('cars/setConfig', config)
    }
  }
}
</script>

<style scoped>

  .col:nth-child(1) {
    text-align: right;
    padding-right:3px;
  }

  .fuel-input-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: var(--fuel-font-size);
    text-align: right;
    background: rgb(64, 152, 211);
    border: 1px solid rgb(64, 152, 211);
    padding-right: 3px;
    width: 80px;
  }

  input.car {
    background: #f86666;
    border: 1px solid #f86666;

  }

  input:focus {
    border: 1px solid rgb(30, 255, 0);
  }

</style>
