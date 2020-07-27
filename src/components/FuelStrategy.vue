<template>
  <div class="fuel-wrap ">

    <div class="row justify-start fuel-header">
        <flag-status></flag-status>
        <time-elapsed></time-elapsed>
        <fuel-inputs v-if="car != 0" :car="activeCar"></fuel-inputs>
        <fuel-outputs v-if="car != 0" :car="activeCar"></fuel-outputs>
    </div>


    <div class="row fuel-table">
      <fuel-table  v-if="car != 0" :car="activeCar"></fuel-table>
    </div>


  </div>
</template>

<script>
import TimeElapsed from 'components/TimeElapsed'
import FuelInputs from 'components/FuelInputs'
import FuelOutputs from 'components/FuelOutputs'
import FlagStatus from 'components/FlagStatus'
import FuelTable from 'components/FuelTable'

export default {
  name: 'FuelStrategy',
  props: {
    car: Number
  },
  computed: {
    activeCar() { return this.$store.state.cars.find(c => c.number === this.$store.state.app.activeCar) }
  },
  components: { TimeElapsed, FuelInputs, FuelOutputs, FlagStatus, FuelTable }
}
</script>

<style>

  .fuel-table {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    top: 185px;
  }

  .fuel-header * {
    user-select: none;
  }
</style>
