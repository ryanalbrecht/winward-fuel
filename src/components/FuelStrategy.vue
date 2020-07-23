<template>
  <div class="fuel-wrap ">

    <div class="row justify-start fuel-header">
        <flag-status :car="car"></flag-status>
        <time-elapsed :car="car"></time-elapsed>
        <fuel-inputs :car="car"></fuel-inputs>
        <fuel-outputs :car="car"></fuel-outputs>
    </div>


    <div class="row fuel-table">
      <fuel-table :car="car"></fuel-table>
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
    car: Object
  },
  components: { TimeElapsed, FuelInputs, FuelOutputs, FlagStatus, FuelTable }
}
</script>

<style>

  .fuel-table {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 185px;
  }

  .fuel-header * {
    user-select: none;
  }
</style>
